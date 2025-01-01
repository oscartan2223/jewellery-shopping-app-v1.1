import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './owlCarousel.css';

const OwlCarouselComponent = ({ imageList = [] }) => {
  const options = {
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <div className="carousel-container">
      {imageList.length > 0 ? (
        <OwlCarousel className="owl-theme" {...options}>
          {imageList.map((image, index) => (
            <div className="item" key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </OwlCarousel>
      ) : (
        <div className="w-100 h-100 all-center fw-bold fs-6">
          No images available
        </div>
      )}
    </div>
  );
};

export default OwlCarouselComponent;
