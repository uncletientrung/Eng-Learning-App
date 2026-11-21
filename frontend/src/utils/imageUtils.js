export function getImageUrl(imageName) {
  if (!imageName) return null;

  if (/^(https?:)?\/\//i.test(imageName) || imageName.startsWith("/")) return imageName;
  if (imageName.startsWith("assets/writing/")) return `/${imageName}`;
  return `/assets/writing/${encodeURIComponent(imageName)}`;
}