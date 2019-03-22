import React from 'react';
import { isEmpty } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { Image, Transformation, Video } from 'cloudinary-react';
import PropTypes from 'prop-types';

import {
  resourceTypes,
  getResourceTypeForThumbnail
} from '../../utils/AssetUtils';


const styles = theme => ({
  assetImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
});

const ResponsiveThumbnail = ({ asset, classes }) => {
  if (!isEmpty(asset)) {
    const resourceType = asset.resource_type;
    const urlResourceType = getResourceTypeForThumbnail(resourceType);

    switch (urlResourceType) {
      case resourceTypes.video:
        return (
          <Video
            responsive
            publicId={`${asset.public_id}.jpg`}
            width="auto"
            crop="scale"
            quality="auto"
            fetchFormat="auto"
            resourceType="video"
            className={classes.assetImage}>
            <Transformation startOffset="0" />
          </Video>
        );
      default:
        return (
          <Image
            responsive
            publicId={`${asset.public_id}.jpg`}
            width="auto"
            crop="scale"
            aspectRatio="1.0"
            quality="auto"
            fetchFormat="auto"
            className={classes.assetImage}>
          </Image>
        );
    }
  } else {
    return <img className={classes.assetImage} src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22https%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="thumbnail" />; /* eslint-disable-line max-len */
  }
};

ResponsiveThumbnail.propTypes = {
  asset: PropTypes.object,
};

export default withStyles(styles)(ResponsiveThumbnail);
