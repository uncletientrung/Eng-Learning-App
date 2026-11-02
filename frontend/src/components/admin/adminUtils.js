import { getImageUrl } from "../../utils/imageUtils";

export function getAdminImageSrc(imageUrl) {
  if (!imageUrl) return null;
  if (/^(https?:)?\/\//i.test(imageUrl) || imageUrl.startsWith("/")) return imageUrl;
  return getImageUrl(imageUrl) || imageUrl;
}
