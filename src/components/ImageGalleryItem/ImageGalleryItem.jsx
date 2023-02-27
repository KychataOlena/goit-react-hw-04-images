import PropTypes from 'prop-types';
import { GalleryItem, ImageGalleryImage } from './ImageGalleryItem.styled';
// import { Modal } from '../Modal/Modal';
// import { Component } from 'react';

export const ImageGalleryItem = ({
  webformatURL,
  onClick,
  largeImageClick,
}) => {
  return (
    <GalleryItem>
      <ImageGalleryImage
        src={`${webformatURL}`}
        onClick={() => onClick(largeImageClick)}
        alt=""
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageClick: PropTypes.string.isRequired,
};
