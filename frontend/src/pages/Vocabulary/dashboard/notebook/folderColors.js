export const FOLDER_COLORS = ["#e99000", "#4c70aa", "#3d9f87", "#cb529d", "#8c59ce", "#607c2e", "#c56636", "#428da9", "#df9e10"];

export function getFolderColor(folder) {
  if (FOLDER_COLORS.includes(folder.color)) return folder.color;
  let hash = 0;
  for (const character of folder.id) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return FOLDER_COLORS[hash % FOLDER_COLORS.length];
}

export function nextFolderColor(folders) {
  const counts = FOLDER_COLORS.map((color) => folders.filter((folder) => getFolderColor(folder) === color).length);
  return FOLDER_COLORS[counts.indexOf(Math.min(...counts))];
}
