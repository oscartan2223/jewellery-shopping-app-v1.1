import React, { useEffect, useState, useRef, useCallback } from 'react';
import './carousel/carousel.css';
import './carousel/carousel.rtl.css';
import '../assets/css/HomePage.css';
import { Carousel } from 'bootstrap';
import { useStock } from '../stockContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Rating, Star } from '@smastrom/react-rating';


const HomePage = ({ showAlert }) => {
  const navigate = useNavigate();
  const { stocks } = useStock();
  const [adsText, setAdsText] = useState('CNY Special Promotion! Up to 10% off when purchase RM 10 000 onwards. T&C apply')
  const [shopCategories, setShopCategories] = useState([]);
  const [browseCategoriesItem, setBrowseCategoriesItem] = useState([]);
  const [selectedBrowseCategoriesItem, setSelectedBrowseCategoriesItem] = useState([]);
  const [buttonVisibility, setButtonVisibility] = useState([]);
  const listRefs = useRef([]);
  const [rating, setRating] = useState({
    star: 4.67,
    number: 1445,
    one: 200,
    two: 40,
    three: 18,
    four: 130,
    five: 1291
  });
  const [adsData, setAdsData] = useState([
    { imgUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/COVER%20PHOTO%20WEBSITE%20(7).png", details: { target: 'item', data: '' } },
    { imgUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/COVER%20PHOTO%20WEBSITE%20(11).png", details: { target: 'contact' } },
    { imgUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/COVER%20PHOTO%20WEBSITE%20(10).png", details: { target: 'faq' } },
    { imgUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/COVER%20PHOTO%20WEBSITE%20(13).png", details: { link: 'https://wa.me/60195481017' } },
    { imgUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/COVER%20PHOTO%20WEBSITE%20(8).png", details: { target: 'location' } },
    { imgUrl: "https://admin.kedaiemasion.my/assets/public/img/slide/COVER%20PHOTO%20WEBSITE%20(4).png", details: null },
    { imgUrl: "https://www.pohkong.com.my/cdn/shop/files/Effective_1st_August_2024_we_require_your_personal_data_for_e-invoice_compliance_as_mandated_by_the_government._Please_provide_necessary_information_when_requested._1.png?v=1722579957&width=1080", details: null },
  ]);

  useEffect(() => {
    const carouselElement = document.getElementById('myCarousel');
    new Carousel(carouselElement, {
      interval: 3000,
      ride: 'carousel'
    });

    const shopCategoryItem = [
      { id: 1, heading: "Pendants & Charms", imageUrl: "https://www.pohkong.com.my/cdn/shop/collections/Image.webp?v=1720618689&width=360" },
      { id: 2, heading: "Rings", imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Image_9_9245a167-96c6-4700-ab90-3299825fa98b.png?v=1717572859&width=360" },
      { id: 3, heading: "Bars, Notes & Coins", imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Gold_Bar_5g.png?v=1721187049&width=360" },
      { id: 4, heading: "Earrings", imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Screenshot_2023-12-11_at_5.14_1_5.png?v=1717572905&width=360" },
      { id: 5, heading: "Bangles", imageUrl: "https://www.pohkong.com.my/cdn/shop/collections/Image_3.webp?v=1720618819&width=360" },
    ];
    setShopCategories(shopCategoryItem);

    setBrowseCategoriesItem(stocks.current);
  }, [stocks]);

  const setSelectedItem = useCallback((position, category_id) => {
    const selected_data = stocks.current
      .map(category => category.items.find(item => item.id === category_id))
      .filter(item => item !== undefined);
    if (selected_data.length > 0) {
      setSelectedBrowseCategoriesItem(prev => {
        const newList = [...prev];
        newList[position] = selected_data[0];
        return newList;
      });
    }
  }, [stocks, setSelectedBrowseCategoriesItem]);

  const handleTab = (index, id) => {
    const tabs = document.querySelectorAll(`.browseCategoriesTab[data-index="${index}"]`);

    tabs.forEach(tab => {
      tab.classList.remove('tab-selected');
    });

    const selectedTab = document.getElementById(`${index}-${id}`);
    if (selectedTab) {
      selectedTab.classList.add('tab-selected');
    }
  };

  const scrollLeft = (id) => {
    const listElement = document.querySelector(`[data-id="${id}"]`);
    if (listElement) {
      listElement.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = (id) => {
    const listElement = document.querySelector(`[data-id="${id}"]`);
    if (listElement) {
      listElement.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const visibility = browseCategoriesItem.map((_, index) => {
        const listElement = listRefs.current[index];
        return listElement && listElement.scrollWidth > listElement.clientWidth;
      });
      setButtonVisibility(visibility);
    });
    listRefs.current.forEach((ref) => {
      if (ref) {
        resizeObserver.observe(ref);
      }
    });
    return () => {
      resizeObserver.disconnect();
    };
  }, [browseCategoriesItem]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stocks.current) {
        stocks.current.forEach((categories, index) => {
          handleTab(index, categories.items[0].id);
          setSelectedItem(index, categories.items[0].id);
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [stocks, setSelectedItem]);

  const handleOpenTarget = (select_target) => {
    if (!select_target) return;
    if (select_target.link) {
      window.location.href = select_target.link;
      return;
    }
    setTimeout(() => {
      select_target.data ? navigate(select_target.target, { state: { data: select_target.data } })
        : navigate(select_target.target);
    }, 200)
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const svgElements = document.querySelectorAll('.rr--box svg > defs + g');
    svgElements.forEach((group) => {
      group.style.position = 'relative';
      const halfFillGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      halfFillGroup.style.position = 'absolute';
      halfFillGroup.style.top = 0;
      halfFillGroup.style.left = 0;
      halfFillGroup.style.zIndex = 1;

      const halfPolygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      halfPolygon.setAttribute('points', '25 9.02 16.4 7.75 12.46 0 8.59 7.79 0 9.14 6.21 15.23 4.85 23.81 12.55 19.79 20.3 23.74 18.85 15.17 25 9.02');
      halfPolygon.setAttribute('fill', 'orange');
      halfPolygon.style.clipPath = 'inset(0 50% 0 0)';
      halfFillGroup.appendChild(halfPolygon);
      group.appendChild(halfFillGroup);
    });
  }, []);

  return (
    <div className="hide-scroll-container">
      <div className="content-site">
        <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
          <div className="carousel-inner">
            {adsData.map((ad, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <img
                  src={ad.imgUrl}
                  className="d-block w-100"
                  alt={`Advertisement ${index + 1}`}
                  onClick={() => { handleOpenTarget(ad.details) }}
                />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev carousel-nav-btn" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon carousel-nav-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Left</span>
          </button>
          <button className="carousel-control-next carousel-nav-btn" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon carousel-nav-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Right</span>
          </button>
        </div>
      </div>

      <div className='animation-ads-container'>
        <div className="animation-container">
          <div className="ads-content fomt-custom-2">{adsText}</div>
        </div>
      </div>



      {browseCategoriesItem !== undefined && selectedBrowseCategoriesItem !== '' &&
        browseCategoriesItem.map((categories, index) =>
          <section className={`browseCategories overflow-hidden ${index % 2 === 0 ? "" : "second"}`} key={index}>
            <div className="shopCatagoriesTitle col-md-12 all-center mb-4">
              <h1 className="mb-0 font-custom">{categories.category}</h1>
            </div>
            <div className="browseCategoriesListContainer mb-5">
              <ul className="browseCategoriesList hide-scroll-container"
                data-id={`browseCategoriesList-${index}`} ref={el => listRefs.current[index] = el}>
                {categories.items.map(item =>
                  <li className="browseCategoriesTab" key={item.id} data-index={index}
                    onClick={() => { handleTab(index, item.id); setSelectedItem(index, item.id) }} id={`${index}-${item.id}`}>
                    <h3 className="underline text-nowrap font-custom-2">{item.heading}</h3>
                  </li>
                )}
              </ul>

              {buttonVisibility[index] && (
                <>
                  <button className="browseLeft" onClick={() => scrollLeft(`browseCategoriesList-${index}`)}>
                    <FontAwesomeIcon icon={faCaretLeft} style={{ cursor: 'pointer' }} />
                  </button>
                  <button className="browseRight" onClick={() => scrollRight(`browseCategoriesList-${index}`)}>
                    <FontAwesomeIcon icon={faCaretRight} style={{ cursor: 'pointer' }} />
                  </button>
                </>
              )}
            </div>

            <div className="browseCategoriesBoxesContainer">
              <div className="browseCategoriesBoxes row flex-nowrap overflow-auto hide-scroll-container" data-id={`item-box-${index}`}>
                {selectedBrowseCategoriesItem[index] && selectedBrowseCategoriesItem[index].item &&
                  selectedBrowseCategoriesItem[index].item.map(eachItem => (
                    <div className="browseCategoriesBox col-sm-6 col-md-4 col-lg-3 col-xl-2 flex-column d-flex" key={eachItem.id} onClick={() => { console.log("success") }}>
                      <div className="ratio ratio-1x1">
                        <img src={eachItem.imageUrl} alt={eachItem.heading} className="img-fluid" />
                      </div>
                      <p className="text-center font-custom pl-4 pr-4">{eachItem.heading}</p>
                      <p className="text-center font-custom fw-bold pl-4 pr-4">{`RM ${eachItem.price} per grams`}</p>
                    </div>
                  ))}
                <div className="boxScrollButtonContainer">
                  <div className="boxScrollButton">
                    <button className="browseBoxLeft" onClick={() => scrollLeft(`item-box-${index}`)}>
                      <FaArrowLeft />
                    </button>
                    <button className="browseBoxRight" onClick={() => scrollRight(`item-box-${index}`)}>
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }

      <section className="shopCategories overflow-hidden">
        <div className="shopCatagoriesTitle col-md-12 all-center mb-4">
          <h1 className="mb-0 font-custom">Shop by Category</h1>
        </div>
        <div className="shopCategoriesItem row hide-scroll-container">
          {shopCategories.map(category => (
            <div key={category.id} className="shopCategoriesBoxes col-md-4 all-center flex-column" onClick={() => { navigate('/item', { state: { categoryId: category.id, otherData: 'Some data' } }) }}>
              <div className="ratio ratio-1x1 w-100">
                <img src={category.imageUrl} alt={category.heading} className="img-fluid" />
              </div>
              <p className="all-center underline fw-bold cursor-pointer user-select-none font-custom">{category.heading}</p>
            </div>
          ))}
        </div>
      </section>

      {rating && rating.star &&
        <section className="home-rate">
          <div className="home-rate-container">

            <div className="home-rate-rating">
              <h1 className="home-rate-ave">{rating.star}</h1>
              <p className="home-rate-num">{`(${rating.number} reviews)`}</p>
              <Rating className="rating-class read"
                style={{ height: 30 }}
                readOnly
                orientation="vertical"
                value={rating.star}
              />
            </div>

            <div className="home-rate-sum">

              <div className="home-rate-sum-container">
                <label className="home-rate-star-label">1</label>
                <span className="home-rate-outer-bar">
                  <span className="home-rate-inner-bar" style={{ width: `${(rating.one / rating.number) * 100}%` }} title={`${rating.one}`}>
                    <span className="tooltip">{rating.one}</span>
                  </span>
                </span>
              </div>

              <div className="home-rate-sum-container">
                <label className="home-rate-star-label">2</label>
                <span className="home-rate-outer-bar">
                  <span className="home-rate-inner-bar" style={{ width: `${(rating.two / rating.number) * 100}%` }} title={`${rating.two}`}>
                    <span className="tooltip">{rating.two}</span>
                  </span>
                </span>
              </div>

              <div className="home-rate-sum-container">
                <label className="home-rate-star-label">3</label>
                <span className="home-rate-outer-bar">
                  <span className="home-rate-inner-bar" style={{ width: `${(rating.three / rating.number) * 100}%` }} title={`${rating.three}`}>
                    <span className="tooltip">{rating.three}</span>
                  </span>
                </span>
              </div>

              <div className="home-rate-sum-container">
                <label className="home-rate-star-label">4</label>
                <span className="home-rate-outer-bar">
                  <span className="home-rate-inner-bar" style={{ width: `${(rating.four / rating.number) * 100}%` }} title={`${rating.four}`}>
                    <span className="tooltip">{rating.four}</span>
                  </span>
                </span>
              </div>

              <div className="home-rate-sum-container">
                <label className="home-rate-star-label">5</label>
                <span className="home-rate-outer-bar">
                  <span className="home-rate-inner-bar" style={{ width: `${(rating.five / rating.number) * 100}%` }} title={`${rating.five}`}>
                    <span className="tooltip">{rating.five}</span>
                  </span>
                </span>
              </div>

            </div>

          </div>
        </section>
      }
    </div>
  );
};

export default HomePage;
