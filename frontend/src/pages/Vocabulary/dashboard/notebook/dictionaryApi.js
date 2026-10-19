const cache = new Map();
const pending = new Map();
const notFoundCache = new Map();
const CACHE_KEY = "vocabulary-dictionary-cache-v1";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const NOT_FOUND_TTL_MS = 20_000;
const MAX_CACHE_ENTRIES = 100;
const MAX_PERSISTED_CHARACTERS = 750_000;
export const DICTIONARY_TIMEOUT_MS = 6000;
export const DICTIONARY_DEBOUNCE_MS = 300;
let cacheLoaded = false;

// Production can point this to its own deployed proxy. Vite's proxy exists in
// development/preview only; a static production build keeps the public endpoint.
const configuredBase = import.meta.env?.VITE_DICTIONARY_API_BASE_URL?.trim();
const dictionaryBase = (configuredBase || (import.meta.env?.DEV ? "/api/vocabulary/dictionary" : "https://api.dictionaryapi.dev/api/v2/entries/en")).replace(/\/+$/, "");
const normalize = (query) => query.trim().replace(/\s+/g, " ").toLowerCase();

function loadCache() {
  if (cacheLoaded) return;
  cacheLoaded = true;
  try {
    const saved = JSON.parse(localStorage.getItem(CACHE_KEY) || "[]");
    if (!Array.isArray(saved)) return;
    for (const item of saved.slice(-MAX_CACHE_ENTRIES)) {
      if (!Array.isArray(item) || item.length !== 2) continue;
      const [word, entry] = item;
      if (typeof word !== "string" || !entry || !Number.isFinite(entry.expiresAt) || entry.expiresAt <= Date.now()) continue;
      if (!Array.isArray(entry.options) || !entry.options.length || !entry.options.every((option) => option && ["id", "word", "type", "meaning"].every((key) => typeof option[key] === "string"))) continue;
      cache.set(normalize(word), entry);
    }
  } catch { /* Dictionary caching must not depend on storage availability. */ }
}

function persistCache() {
  try {
    const entries = [...cache].filter(([, entry]) => entry.expiresAt > Date.now());
    let serialized = JSON.stringify(entries);
    while (serialized.length > MAX_PERSISTED_CHARACTERS && entries.length) {
      entries.shift();
      serialized = JSON.stringify(entries);
    }
    localStorage.setItem(CACHE_KEY, serialized);
  } catch { /* The in-memory cache remains available if storage is full. */ }
}

export function getCachedDictionaryWord(query) {
  loadCache();
  const word = normalize(query);
  const entry = cache.get(word);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) { cache.delete(word); return null; }
  cache.delete(word);
  cache.set(word, entry);
  return entry.options;
}

function remember(word, options) {
  cache.delete(word);
  cache.set(word, { options, expiresAt: Date.now() + CACHE_TTL_MS });
  while (cache.size > MAX_CACHE_ENTRIES) cache.delete(cache.keys().next().value);
  notFoundCache.delete(word);
  persistCache();
}

function abortError() {
  return new DOMException("Dictionary lookup cancelled", "AbortError");
}

function makeRequest(word) {
  const controller = new AbortController();
  const request = { controller, consumers: 0, settled: false, abortTimer: null, promise: null };
  let timedOut = false;
  const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, DICTIONARY_TIMEOUT_MS);
  request.promise = (async () => {
    try {
      const response = await fetch(`${dictionaryBase}/${encodeURIComponent(word)}`, { signal: controller.signal, headers: { Accept: "application/json" } });
      if (response.status === 404) {
        const error = new Error("Không tìm thấy từ này. Bạn kiểm tra lại chính tả nhé.");
        notFoundCache.set(word, { error, expiresAt: Date.now() + NOT_FOUND_TTL_MS });
        while (notFoundCache.size > MAX_CACHE_ENTRIES) notFoundCache.delete(notFoundCache.keys().next().value);
        throw error;
      }
      if (response.status === 429) throw new Error("Từ điển đang nhận nhiều yêu cầu. Vui lòng thử lại sau một chút.");
      if (response.status === 504 || response.status === 502) throw new Error("Từ điển phản hồi chậm hoặc chưa kết nối được. Vui lòng thử lại.");
      if (!response.ok) throw new Error("Từ điển tạm thời chưa phản hồi. Vui lòng thử lại.");
      const options = parseDictionaryEntries(await response.json(), word);
      if (!options.length) throw new Error("Từ này chưa có định nghĩa để chọn.");
      remember(word, options);
      return options;
    } catch (error) {
      if (timedOut) throw new Error("Tra từ quá 6 giây. Vui lòng thử lại.", { cause: error });
      if (controller.signal.aborted) throw abortError();
      if (error instanceof TypeError) throw new Error("Không kết nối được từ điển. Kiểm tra kết nối mạng rồi thử lại.", { cause: error });
      throw error;
    } finally {
      clearTimeout(timeout);
      clearTimeout(request.abortTimer);
      request.settled = true;
      if (pending.get(word) === request) pending.delete(word);
    }
  })();
  pending.set(word, request);
  return request;
}

function consumeRequest(word, request, signal) {
  clearTimeout(request.abortTimer);
  request.consumers++;
  return new Promise((resolve, reject) => {
    let done = false;
    const release = () => {
      signal?.removeEventListener("abort", onAbort);
      request.consumers--;
      if (request.consumers === 0 && !request.settled) {
        // A short grace period lets StrictMode/re-entering rows reuse the request.
        request.abortTimer = setTimeout(() => {
          if (request.consumers === 0 && !request.settled) {
            if (pending.get(word) === request) pending.delete(word);
            request.controller.abort();
          }
        }, 100);
      }
    };
    const complete = (callback, value) => {
      if (done) return;
      done = true;
      release();
      callback(value);
    };
    const onAbort = () => complete(reject, abortError());
    signal?.addEventListener("abort", onAbort, { once: true });
    request.promise.then((options) => complete(resolve, options), (error) => complete(reject, error));
    if (signal?.aborted) onAbort();
  });
}

export function parseDictionaryEntries(entries, query) {
  if (!Array.isArray(entries)) return [];
  const options = [];
  const seen = new Set();
  entries.forEach((entry, entryIndex) => {
    if (!entry || typeof entry !== "object") return;
    const word = typeof entry.word === "string" && entry.word.trim() ? entry.word.trim() : query;
    (Array.isArray(entry.meanings) ? entry.meanings : []).forEach((meaning, meaningIndex) => {
      if (!meaning || typeof meaning.partOfSpeech !== "string") return;
      const type = meaning.partOfSpeech.trim().toLowerCase();
      if (!type) return;
      (Array.isArray(meaning.definitions) ? meaning.definitions : []).forEach((item, definitionIndex) => {
        if (!item || typeof item.definition !== "string" || !item.definition.trim()) return;
        const definition = item.definition.trim();
        const key = JSON.stringify([type, definition.replace(/\s+/g, " ").toLowerCase()]);
        if (seen.has(key)) return;
        seen.add(key);
        options.push({
          id: `${entryIndex}-${meaningIndex}-${definitionIndex}`,
          word,
          type,
          meaning: definition,
          example: typeof item.example === "string" ? item.example.trim() : "",
          phonetic: typeof entry.phonetic === "string" ? entry.phonetic : "",
          sourceUrl: Array.isArray(entry.sourceUrls) ? entry.sourceUrls.find((url) => typeof url === "string" && /^https?:\/\//.test(url)) || "" : "",
        });
      });
    });
  });
  return options;
}

export async function lookupDictionaryWord(query, signal, { retry = false } = {}) {
  if (signal?.aborted) throw abortError();
  const word = normalize(query);
  if (!word) return [];
  const cached = getCachedDictionaryWord(word);
  if (cached) return cached;
  if (retry) notFoundCache.delete(word);
  const notFound = notFoundCache.get(word);
  if (notFound?.expiresAt > Date.now()) throw notFound.error;
  notFoundCache.delete(word);
  return consumeRequest(word, pending.get(word) || makeRequest(word), signal);
}
