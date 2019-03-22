export const resourceTypes = {
  image: 'image',
  video: 'video',
  pdf: 'pdf'
};

export const resourceCategories = {
  images: 'images',
  videos: 'videos',
  pdfs: 'pdfs'
};

export const getResourceTypeForThumbnail = resourceType => (
  resourceType === resourceTypes.image || resourceType === resourceTypes.pdf
    ? resourceTypes.image
    : resourceTypes.video
);

export const getAssetTitle = (asset) => {
  const DEFAULT_TITLE = 'Title';
  const {
    context: { custom: { caption: title } } = {
      custom: { caption: DEFAULT_TITLE }
    }
  } = asset;
  return title;
};

export const getAssetDescription = (asset) => {
  const DEFAULT_DESCRIPTION = 'Description';
  const {
    context: { custom: { alt: description } } = {
      custom: { alt: DEFAULT_DESCRIPTION }
    }
  } = asset;
  return description;
};
