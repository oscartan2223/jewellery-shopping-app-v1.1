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


const HomePage = ({ showAlert }) => {
  const navigate = useNavigate();
  const { stocks } = useStock();
  const [shopCategories, setShopCategories] = useState([]);
  const [browseCategoriesItem, setBrowseCategoriesItem] = useState([]);
  const [selectedBrowseCategoriesItem, setSelectedBrowseCategoriesItem] = useState([]);
  const [buttonVisibility, setButtonVisibility] = useState([]);
  const listRefs = useRef([]);

  useEffect(() => {
    const carouselElement = document.getElementById('myCarousel');
    new Carousel(carouselElement, {
      interval: 3000,
      ride: 'carousel'
    });

    const shopCategoryItem = [
      { id: "A1", heading: "Pendants & Charms", imageUrl: "https://www.pohkong.com.my/cdn/shop/collections/Image.webp?v=1720618689&width=360" },
      { id: "A2", heading: "Rings", imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Image_9_9245a167-96c6-4700-ab90-3299825fa98b.png?v=1717572859&width=360" },
      { id: "A3", heading: "Bars, Notes & Coins", imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Gold_Bar_5g.png?v=1721187049&width=360" },
      { id: "A4", heading: "Earrings", imageUrl: "https://www.pohkong.com.my/cdn/shop/files/Screenshot_2023-12-11_at_5.14_1_5.png?v=1717572905&width=360" },
      { id: "A5", heading: "Bangles", imageUrl: "https://www.pohkong.com.my/cdn/shop/collections/Image_3.webp?v=1720618819&width=360" },
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


  return (
    <div className="hide-scroll-container">
      <div className="content-site">
        <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="5" aria-label="Slide 6"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="6" aria-label="Slide 7"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://www.pohkong.com.my/cdn/shop/files/11.11_Exclusive__DesktopBanner_5760x2190_852ba0c2-92d7-4ad9-8e16-05e3165a2565.jpg?v=1731056930&width=1950"
                className="d-block w-100"
                alt="Advertisement"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.pohkong.com.my/cdn/shop/files/Untitled_design_72.png?v=1730103122&width=1080"
                className="d-block w-100"
                alt="Advertisement"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.pohkong.com.my/cdn/shop/files/DEEPAVALI_WEB_DESKTOP_BANNER_5760x2190_1639a333-4869-4906-9bb1-59a09f74c755.jpg?v=1729154197&width=1080"
                className="d-block w-100"
                alt="Advertisement"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.pohkong.com.my/cdn/shop/files/Tranz_x_KLFW_2024_Web_Banner_Desktop.jpg?v=1722325614&width=1080"
                className="d-block w-100"
                alt="Advertisement"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.pohkong.com.my/cdn/shop/files/5760x2190-100_R1.jpg?v=1721099746&width=1080"
                className="d-block w-100"
                alt="Advertisement"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.pohkong.com.my/cdn/shop/files/Dinar_Gold_Bar_5760_x_2190_R1_1.jpg?v=1721202014&width=1080"
                className="d-block w-100"
                alt="Advertisement"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.pohkong.com.my/cdn/shop/files/Effective_1st_August_2024_we_require_your_personal_data_for_e-invoice_compliance_as_mandated_by_the_government._Please_provide_necessary_information_when_requested._1.png?v=1722579957&width=1080"
                className="d-block w-100"
                alt="Advertisement"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="shopCategories overflow-hidden">
        <div className="shopCatagoriesTitle col-md-12 all-center mb-4">
          <h1 className="mb-0 font-custom">Shop by Category</h1>
        </div>
        <div className="shopCategoriesItem row hide-scroll-container">
          {shopCategories.map(category => (
            <div key={category.id} className="shopCategoriesBoxes col-md-4 all-center flex-column" onClick={() => {navigate('/item', {state: { categoryId: category.id, otherData: 'Some data' }} )}}>
              <div className="ratio ratio-1x1 w-100">
                <img src={category.imageUrl} alt={category.heading} className="img-fluid" />
              </div>
              <p className="all-center underline fw-bold cursor-pointer user-select-none font-custom">{category.heading}</p>
            </div>
          ))}
        </div>
      </section>

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
    </div>
  );
};

export default HomePage;
