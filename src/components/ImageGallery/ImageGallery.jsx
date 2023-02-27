import PropTypes from 'prop-types';
import { ImageGalleryList } from '../ImageGallery/ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items, onClick }) => {
  return (
    <ImageGalleryList>
      {items.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageClick={largeImageURL}
          onClick={onClick}
        ></ImageGalleryItem>
      ))}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
