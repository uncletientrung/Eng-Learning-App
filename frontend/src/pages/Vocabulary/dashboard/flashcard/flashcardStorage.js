const settingsKey = "vocabulary-flashcard-settings-v1";
export const defaultSettings = { front: "en", ipa: true, examples: true, autoRead: false, voice: "en-GB", color: "#ffc02e" };
export const cardColors = ["#ffc02e", "#a7d9ce", "#b9cdf1", "#d9c0ee", "#f4b5ce", "#efc3a1"];

export function readSettings() {
  try {
    const value = JSON.parse(localStorage.getItem(settingsKey));
    if (!value || typeof value !== "object") return defaultSettings;
    return {
      front: value.front === "vi" ? "vi" : "en",
      ipa: typeof value.ipa === "boolean" ? value.ipa : true,
      examples: typeof value.examples === "boolean" ? value.examples : true,
      autoRead: value.autoRead === true,
      voice: value.voice === "en-US" ? "en-US" : "en-GB",
      color: cardColors.includes(value.color) ? value.color : defaultSettings.color,
    };
  } catch { return defaultSettings; }
}

export function saveSettings(settings) { localStorage.setItem(settingsKey, JSON.stringify(settings)); }

const progressKey = (folderId) => `vocabulary-flashcard-progress-v1:${folderId}`;

export function readProgress(folderId) {
  try {
    const value = JSON.parse(localStorage.getItem(progressKey(folderId)));
    if (!Array.isArray(value)) return {};
    return Object.fromEntries(value.filter((item) => item && typeof item.id === "string" && [1, 2, 3, 4].includes(item.grade)).map((item) => [item.id, item]));
  } catch { return {}; }
}

export function saveProgress(folderId, progress) { localStorage.setItem(progressKey(folderId), JSON.stringify(Object.values(progress))); }

export function shuffledIds(words) {
  const ids = words.map((word) => word.id);
  for (let index = ids.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [ids[index], ids[other]] = [ids[other], ids[index]];
  }
  return ids;
}
