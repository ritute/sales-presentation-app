import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import { Image, Video } from 'cloudinary-react';
import PropTypes from 'prop-types';

import Config from '../../config/config';
import { resourceTypes } from '../../utils/AssetUtils';

const AssetPreview = ({ asset, dimensions, theme }) => {
  const renderImage = (asset, boundingWidth, boundingHeight) => {
    return (
      <Image
        publicId={asset.public_id}
        width={boundingWidth}
        height={boundingHeight}
        crop="fit"
        quality="auto"
        fetchFormat="auto">
      </Image>
    );
  };

  const renderPDF = (asset, boundingWidth, boundingHeight) => {
    // Assume browser has plugin for rendering PDF already for demo purposes,
    // otherwise can use react-pdf for better support and consistency.
    return (
      <embed
        src={`https://res.cloudinary.com/${Config.cloudName}/image/upload/${asset.public_id}`}
        width={boundingWidth}
        height={boundingHeight}
      />
    );
  };

  const renderVideo = (asset, boundingWidth, boundingHeight) => {
    return (
      <Video
        publicId={asset.public_id}
        controls={true}
        width={boundingWidth}
        height={boundingHeight}
      >
      </Video>
    );
  };

  const renderAsset = (asset, dimensions, theme) => {
    const padding = theme.spacing(3);
    const boundingWidth = Math.floor(dimensions.width - padding * 2);
    const boundingHeight = Math.floor(dimensions.height - padding * 2);

    switch(asset.resource_type) {
      case resourceTypes.pdf:
        return renderPDF(asset, boundingWidth, boundingHeight);
      case resourceTypes.video:
        return renderVideo(asset, boundingWidth, boundingHeight);
      default:
        return renderImage(asset, boundingWidth, boundingHeight);
    }
  }

  return renderAsset(asset, dimensions, theme);
};

AssetPreview.propTypes = {
  asset: PropTypes.object,
  dimensions: PropTypes.object,
};

export default withTheme(AssetPreview);
