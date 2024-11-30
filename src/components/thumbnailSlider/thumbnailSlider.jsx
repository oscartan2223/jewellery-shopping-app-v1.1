import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./thumbnailSlider.css";

const ThumbnailSlider = ({ images }) => {
  return (
    <div className="thumbnail-slider">
      <ImageGallery items={images} />
    </div>
  );
};

export default ThumbnailSlider;
