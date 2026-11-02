import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../../services/authApi";
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

const progressKey = (folderId) => `vocabulary-flashcard-progress-v2:${getCurrentUser()?.id ?? "guest"}:${folderId}`;

export function readProgress(folderId) {
  try {
    const value = JSON.parse(localStorage.getItem(progressKey(folderId)));
    if (!Array.isArray(value)) return {};
    return Object.fromEntries(value.filter((item) => item && typeof item.id === "string" && [1, 2, 3, 4].includes(item.grade)).map((item) => [item.id, { ...item, next_review_at: nextReviewDate(item) ?? item.next_review_at }]));
  } catch { return {}; }
}

export function saveProgress(folderId, progress) {
  localStorage.setItem(progressKey(folderId), JSON.stringify(Object.values(progress)));
  window.dispatchEvent(new Event("vocabulary-progress-updated"));
}

export function shuffledIds(words) {
  const ids = words.map((word) => word.id);
  for (let index = ids.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [ids[index], ids[other]] = [ids[other], ids[index]];
  }
  return ids;
}

export const reviewIntervals = [0, 3, 7, 14, 30, 60, 90, 180];
const dayMilliseconds = 24 * 60 * 60 * 1000;

function reviewDelayDays(grade, level) {
  if (grade === 1) return 0;
  if (grade === 2) return 1;
  const rememberedLevel = Number.isInteger(level) ? Math.max(1, Math.min(7, level)) : 1;
  return reviewIntervals[rememberedLevel];
}

export function reviewDate(now = new Date(), days = 0) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type) => parts.find((item) => item.type === type).value;
  const date = new Date(`${part("year")}-${part("month")}-${part("day")}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function scheduleReview(previous, grade, now = new Date()) {
  const oldLevel = Number.isInteger(previous?.level) ? Math.max(0, Math.min(7, previous.level)) : 0;
  const level = grade === 1 ? 0 : grade === 2 ? oldLevel : Math.min(7, oldLevel + 1);
  return { grade, level, reviewedAt: now.toISOString(), next_review_at: reviewDate(now, reviewDelayDays(grade, level)) };
}

function nextReviewDate(progress) {
  const value = progress?.next_review_at;
  if (typeof value !== "string") return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : null;
  }

  // Earlier browser progress used timestamps. Restore the calendar-day schedule
  // from the original answer and level, without restarting the reminder wait.
  const reviewedAt = Date.parse(progress.reviewedAt);
  if (!/^\d{4}-\d{2}-\d{2}T/.test(value) || !Number.isFinite(Date.parse(value)) || !Number.isFinite(reviewedAt)) return null;
  return reviewDate(new Date(reviewedAt), reviewDelayDays(progress.grade, progress.level));
}

export function isReviewDue(progress, now = new Date()) {
  if (!progress || ![1, 2, 3, 4].includes(progress.grade) ||
      typeof progress.reviewedAt !== "string" || typeof progress.next_review_at !== "string") return false;
  const currentTime = new Date(now);
  if (!Number.isFinite(Date.parse(progress.reviewedAt)) || !Number.isFinite(currentTime.getTime())) return false;
  const nextDate = nextReviewDate(progress);
  return nextDate !== null && nextDate <= reviewDate(currentTime);
}

export function isReviewReminderDue(progress, now = new Date()) {
  if (!isReviewDue(progress, now)) return false;
  return new Date(now).getTime() - Date.parse(progress.reviewedAt) >= dayMilliseconds;
}

export function groupFlashcardWords(words, progress, now = new Date()) {
  const groups = { remembered: [], unremembered: [], due: [] };
  for (const word of words) {
    const entry = progress[word.id];
    const category = isReviewDue(entry, now) ? "due" : entry?.grade >= 3 ? "remembered" : "unremembered";
    groups[category].push(word);
  }
  return groups;
}

export function useReviewUpdates() {
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const update = () => setRevision((value) => value + 1);
    const storage = (event) => { if (!event.key || event.key.startsWith("vocabulary-")) update(); };
    const timer = window.setInterval(update, 60000);
    window.addEventListener("vocabulary-progress-updated", update);
    window.addEventListener("storage", storage);
    window.addEventListener("focus", update);
    return () => {
      clearInterval(timer);
      window.removeEventListener("vocabulary-progress-updated", update);
      window.removeEventListener("storage", storage);
      window.removeEventListener("focus", update);
    };
  }, []);
  return revision;
}
