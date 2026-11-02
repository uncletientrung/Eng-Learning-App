import { isReviewDue, useVocabularyProgress } from "./flashcardProgress";

export function useDueFolders() {
  const { progress, loading, error } = useVocabularyProgress();
  const folders = new Map();
  for (const entry of Object.values(progress)) {
    if (!isReviewDue(entry)) continue;
    const { word } = entry;
    if (!folders.has(word.topicId)) folders.set(word.topicId, {
      id: word.topicId, name: entry.setName, wordCount: entry.wordCount, dueWords: [], signatures: [],
    });
    const folder = folders.get(word.topicId);
    folder.dueWords.push(word);
    folder.signatures.push([word.id, entry.lastReviewedAt, entry.nextReviewAt, entry.status]);
  }
  return { loading, error, folders: [...folders.values()].map(({ signatures, ...folder }) => ({
    ...folder, signature: JSON.stringify(signatures),
  })) };
}

export const dueFolderLink = (id) => `/vocabulary/flashcard?folder=${encodeURIComponent(id)}&review=due`;

