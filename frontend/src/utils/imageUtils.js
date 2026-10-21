const images = import.meta.glob(
  '../assets/images/*',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

export function getImageUrl(imageName) {
  if (!imageName) return null;

  return images[`../assets/images/${imageName}`] || null;
}