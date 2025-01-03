// api/sanity/client.js
import imageUrlBuilder from "@sanity/image-url";

export const getImageUrl = (projectId, dataset) => {
  return (source) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
};
