import { useNotebookFolders } from "../notebook/notebookStorage";
import { isReviewDue, isReviewReminderDue, readProgress, useReviewUpdates } from "./flashcardStorage";

export function useDueFolders({ remindersOnly = false } = {}) {
  const folders = useNotebookFolders();
  useReviewUpdates();
  return folders.map((folder) => {
    const progress = readProgress(folder.id);
    const isDue = remindersOnly ? isReviewReminderDue : isReviewDue;
    const dueWords = folder.words.filter((word) => isDue(progress[word.id]));
    const signature = JSON.stringify(dueWords.map((word) => [word.id, progress[word.id]?.reviewedAt, progress[word.id]?.next_review_at]));
    return { ...folder, dueWords, signature };
  }).filter((folder) => folder.dueWords.length);
}

export const dueFolderLink = (id) => `/vocabulary/flashcard?folder=${encodeURIComponent(id)}&review=due`;

