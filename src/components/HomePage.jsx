import React, { useEffect, useState, useRef, useCallback } from 'react';
import './carousel/carousel.css';
import './carousel/carousel.rtl.css';
import '../assets/css/HomePage.css';
import { Carousel } from 'bootstrap';
import { useStock } from '../stockContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating';
import MultiRangeSlider from './multiRangeSlider/MultiRangeSlider.js';
import Notifications from './notifications/notifications.jsx';


const HomePage = ({ showAlert }) => {
  const navigate = useNavigate();
  const { stocks } = useStock();

  const [onLoadNotification, setOnLoadNotification] = useState(false);
  const [shopCategories, setShopCategories] = useState([]);
  const [browseCategoriesItem, setBrowseCategoriesItem] = useState([]);
  const [selectedBrowseCategoriesItem, setSelectedBrowseCategoriesItem] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState();

  const [filterClick, setFilterClick] = useState(false);
  const [switchCollapse, setSwitchCollapse] = useState(true);
  const [certChecked, setCertChecked] = useState(false);
  const [boxChecked, setBoxChecked] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);
  const [minMeasurement, setMinMeasurement] = useState(0);
  const [maxMeasurement, setMaxMeasurement] = useState(99999);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(99999);

  const [currentMinPrice, setCurrentMinPrice] = useState(0);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(99999);
  const [currentMinMeasurement, setCurrentMinMeasurement] = useState(0);
  const [currentMaxMeasurement, setCurrentMaxMeasurement] = useState(99999);
  const [currentMinWeight, setCurrentMinWeight] = useState(0);
  const [currentMaxWeight, setCurrentMaxWeight] = useState(99999);

  const [adsText, setAdsText] = useState('CNY Special Promotion! Up to 10% off when purchase RM 10 000 onwards. T&C apply')

  const [rating, setRating] = useState({
    star: 4.67,
    number: 1445,
    one: 200,
    two: 40,
    three: 18,
    four: 130,
    five: 1291
  });

  const ratingLevels = [
    { label: 1, count: rating.one },
    { label: 2, count: rating.two },
    { label: 3, count: rating.three },
    { label: 4, count: rating.four },
    { label: 5, count: rating.five }
  ];

  const [commentType, setCommentType] = useState([
    { id: 1, type: "cheap" },
    { id: 2, type: "expensive" },
    { id: 3, type: "service" },
    { id: 4, type: "quality" },
    { id: 5, type: "worth" },
    { id: 6, type: "design" },
  ]);
  const [currentSelectedComment, setCurrentSelectedComment] = useState();
  const [currentCommentList, setCurrentCommentList] = useState();

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
    onLoadNotification ? document.documentElement.style.overflow = 'hidden' : document.documentElement.style.overflow = '';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [onLoadNotification]);

  useEffect(() => {
    const carouselElement = document.getElementById('myCarousel');
    new Carousel(carouselElement, {
      interval: 3000,
      ride: 'carousel'
    });

    if (stocks.current) {
      const shopCategoriesItem = stocks.current.flatMap(eachCategory =>
        eachCategory.items.map(eachItem => ({
          id: eachItem.id,
          heading: eachItem.heading,
          imageUrl: eachItem.imageUrl
        }))
      );

      setShopCategories(shopCategoriesItem);

      setBrowseCategoriesItem(stocks.current);
      setFilteredData(stocks.current);
      setOnLoadNotification(true);
    }
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

  const filterData = useCallback((event, minPrice = currentMinPrice, maxPrice = currentMaxPrice,
    minWeight = currentMinMeasurement, maxWeight = currentMaxMeasurement,
    minMeasurement = currentMinMeasurement, maxMeasurement = currentMaxWeight) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }

    const searchQuery = event.target.value;
    setQuery(searchQuery);
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filteredData = browseCategoriesItem.map(category => {
      const matchesCategory = category.category && category.category.toLowerCase().includes(lowerCaseQuery);
      const filteredItems = category.items.map(group => {
        const matchesGroup = group.heading.toLowerCase().includes(lowerCaseQuery);
        const filteredStock = group.item.map(item => {
          const matchesItem = item.heading.toLowerCase().includes(lowerCaseQuery);
          const filteredStocks = item.stock.filter(stock => {
            const inPriceRange = stock.actual_price >= minPrice && stock.actual_price <= maxPrice;
            const inWeightRange = stock.weight >= minWeight && stock.weight <= maxWeight;
            const inMeasurementRange = stock.measurement >= minMeasurement && stock.measurement <= maxMeasurement;
            const matchesStockCode = stock.stockCode.toLowerCase().includes(lowerCaseQuery) || matchesItem || matchesGroup || matchesCategory;
            const certCheck = document.getElementById('certCheck').checked ? stock.isCert === true : true;
            const boxCheck = document.getElementById('boxCheck').checked ? stock.isBox === true : true;

            return inPriceRange &&
              inWeightRange &&
              inMeasurementRange &&
              matchesStockCode &&
              certCheck &&
              boxCheck;
          });

          if (filteredStocks.length > 0 || matchesItem) {
            return {
              ...item,
              stock: filteredStocks
            };
          }

          return null;
        }).filter(item => item && item.stock.length > 0);

        if (filteredStock.length > 0 || matchesGroup) {
          return {
            ...group,
            item: filteredStock
          };
        }

        return null;
      }).filter(group => group && group.item.length > 0);

      if (filteredItems.length > 0 || matchesCategory) {
        return {
          ...category,
          items: filteredItems
        };
      }

      return null;
    }).filter(category => category);
    setFilteredData(filteredData);
  },);

  const updateMeasurement = (min, max) => {
    setMinMeasurement(min);
    setMaxMeasurement(max);
  };

  const updatePrice = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const updateWeight = (min, max) => {
    setMinWeight(min);
    setMaxWeight(max);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };

  const applyFilter = () => {
    setCurrentMinPrice(minPrice);
    setCurrentMaxPrice(maxPrice);
    setCurrentMinMeasurement(minMeasurement);
    setCurrentMaxMeasurement(maxMeasurement);
    setCurrentMinWeight(minWeight);
    setCurrentMaxWeight(maxWeight);

    filterData({ target: { value: query } }, minPrice, maxPrice, minMeasurement, maxMeasurement, minWeight, maxWeight);
    setFilterClick(!filterClick);
  };

  const scrollCommentLeft = () => {
    const listElement = document.getElementById("comment-type-list");
    if (listElement) {
      listElement.scrollBy({ left: -20, behavior: 'smooth' });
    }
  };

  const scrollCommentRight = () => {
    const listElement = document.getElementById("comment-type-list");
    if (listElement) {
      listElement.scrollBy({ left: 20, behavior: 'smooth' });
    }
  };

  const handleCommentType = (id) => {
    if (currentSelectedComment !== id) {
      setCurrentSelectedComment(id);
      if (id === 1) {
        setCurrentCommentList([
          { rating: 4, name: "Justin Bieber", comment: "The gold price is cheaper compare to well-known jewellery retailers." },
          { rating: 5, name: "Ed Sheeran", comment: "These products cheap and valuable." },
          { rating: 3, name: "Billie Eilish", comment: "Acceptable quality and come with cheap prices." },
          { rating: 1, name: "Alan Walker", comment: "Not cheap at all!" },
        ])
      } else {
        setCurrentCommentList([]);
      }
    } else {
      setCurrentSelectedComment(null);
      setCurrentCommentList([]);
    }
  };

  const naviItem = (data) => {
    setTimeout(() => {
      navigate('/item', { state: data });
    }, 200)
    window.scrollTo(0, 0);
  }

  return (
    <>
      {onLoadNotification &&
        <Notifications onClose={() => setOnLoadNotification(!onLoadNotification)} />
      }
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

        <div className="home-search-container">
          <div className="home-search-input-container">
            <input
              className="form-control home-search-input"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={filterData}
              onKeyDown={handleKeyDown}
            />
            <FaSearch className="home-search-icon" />
            <button className={`home-filter-btn ${filterClick ? 'openFilter' : ''}`} onClick={() => { setFilterClick(!filterClick) }}>Filter</button>
          </div>
          <div className={`home-filter-container ${filterClick ? 'open' : ''}`}>
            <div className="item-slider-container">
              <label className="item-adjust-label font-custom-2">Price</label>
              <MultiRangeSlider
                min={0}
                max={99999}
                initialMinValue={currentMinPrice}
                initialMaxValue={currentMaxPrice}
                onChange={({ min, max }) => updatePrice(min, max)}
              />
            </div>
            <div className="item-slider-container">
              <label className="item-adjust-label font-custom-2">Measurement</label>
              <MultiRangeSlider
                min={0}
                max={99999}
                initialMinValue={currentMinMeasurement}
                initialMaxValue={currentMaxMeasurement}
                onChange={({ min, max }) => updateMeasurement(min, max)}
              />
            </div>
            <div className="item-slider-container">
              <label className="item-adjust-label font-custom-2">Weight</label>
              <MultiRangeSlider
                min={0}
                max={99999}
                initialMinValue={currentMinWeight}
                initialMaxValue={currentMaxWeight}
                onChange={({ min, max }) => updateWeight(min, max)}
              />
            </div>
            <pre className="w-100 all-center fw-bold mb-4 font-custom" onClick={() => setSwitchCollapse(!switchCollapse)}>
              Advanced  {switchCollapse ? <FaPlus /> : <FaMinus />}
            </pre>
            <div className={switchCollapse ? 'hide' : ''}>
              <div className="item-cert-container">
                <label className="item-switch-label select-none">Is Certificate Only</label>
                <label className={`switch ${!filterClick ? 'hide' : ''}`}>
                  <input type="checkbox" checked={certChecked} id='certCheck' readOnly />
                  <span className="slider_switch round" onClick={() => { setCertChecked(!certChecked) }} />
                  <span className="absolute-no" onClick={() => { setCertChecked(!certChecked) }}>{certChecked ? '' : 'No'}</span>
                </label>
              </div>
              <div className="item-cert-container">
                <label className="item-switch-label select-none">With Box Only</label>
                <label className={`switch select-none ${!filterClick ? 'hide' : ''}`}>
                  <input type="checkbox" checked={boxChecked} id='boxCheck' readOnly />
                  <span className="slider_switch round select-none" onClick={() => { setBoxChecked(!boxChecked) }} />
                  <span className="absolute-no select-none" onClick={() => { setBoxChecked(!boxChecked) }}>{boxChecked ? '' : 'No'}</span>
                </label>
              </div>
            </div>
            <button className="apply_button" onClick={applyFilter}>
              Apply Filter
            </button>
          </div>
        </div>
        {filteredData !== undefined && selectedBrowseCategoriesItem !== '' &&
          filteredData.map((categories, index) =>
            <section className={`browseCategories overflow-hidden ${index % 2 === 0 ? "" : "second"}`} key={index}>
              <div className="shopCatagoriesTitle col-md-12 all-center mb-5">
                <h1 className="mb-0 font-custom select-none">{categories.category}</h1>
              </div>
              <div className="browseCategoriesBoxesContainer">
                <div className="browseCategoriesBoxes row flex-nowrap overflow-auto hide-scroll-container" data-id={`item-box-${index}`}>
                  {categories.items.map(item => (
                    <div className="browseCategoriesBox col-sm-6 col-md-4 col-lg-3 col-xl-2 flex-column d-flex" key={item.id}
                      onClick={() => {
                        naviItem({
                          categoryId: item.id, otherData: filteredData.filter(eachCategory => {
                            return eachCategory.items.find(eachItem => eachItem.id === item.id);
                          })
                        })
                      }}>
                      <div className="ratio ratio-1x1">
                        <img src={item.imageUrl} alt={item.heading} className="img-fluid" />
                      </div>
                      <p className="text-center font-custom pl-4 pr-4">{item.heading}</p>

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
            <h1 className="mb-4 font-custom select-none">Shop by Category</h1>
          </div>
          <div className="shopCategoriesItem row hide-scroll-container">
            {shopCategories.map(category => (
              <div key={category.id} className="shopCategoriesBoxes col-md-4 all-center flex-column" onClick={() => { naviItem({ categoryId: category.id, otherData: category }) }}>
                <div className="ratio ratio-1x1 w-100">
                  <img src={category.imageUrl} alt={category.heading} className="img-fluid" />
                </div>
                <p className="all-center underline fw-bold cursor-pointer select-none font-custom">{category.heading}</p>
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
                {ratingLevels.map((level) => (
                  <div key={level.label} className="home-rate-sum-container">
                    <label className="home-rate-star-label">{level.label}</label>
                    <span className="home-rate-outer-bar">
                      <span
                        className="home-rate-inner-bar"
                        style={{ width: `${(level.count / rating.number) * 100}%` }}
                        title={`${level.count}`}
                      >
                        <span className="tooltip">{level.count}</span>
                      </span>
                    </span>
                  </div>
                ))}
              </div>

            </div>

            <div className="home-rate-comment-type-container">
              <div className="home-rate-comment-type">
                <FontAwesomeIcon className="home-comment-left-icon" icon={faCaretLeft} onClick={scrollCommentLeft} />

                <div className="home-comment-middle-type hide-scroll-container" id="comment-type-list">
                  {commentType &&
                    commentType.map((eachType, index) => (
                      <button key={index} className={`home-comment-type-btn font-custom-2 ${eachType.id === currentSelectedComment ? 'selected' : ''}`} onClick={() => { handleCommentType(eachType.id) }}>
                        {eachType.type}
                      </button>
                    ))}
                </div>

                <FontAwesomeIcon className="home-comment-right-icon" icon={faCaretRight} onClick={scrollCommentRight} />
              </div>
            </div>

            <div className="home-rate-comment-container hide-scroll-container">
              {currentCommentList &&
                currentCommentList.map((eachComment, index) => (
                  <div key={index} className="home-rate-comment-box">
                    <label className="home-rate-comment-user font-custom">{eachComment.name}</label>
                    <Rating className="rating-class comment"
                      style={{ height: 35 }}
                      readOnly
                      orientation="vertical"
                      value={eachComment.rating}
                    />
                    <p className="font-custom-2">{eachComment.comment}</p>
                  </div>
                ))}
            </div>
          </section>
        }
      </div>
    </>
  );
};

export default HomePage;
