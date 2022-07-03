document.addEventListener('DOMContentLoaded', function() {
"use strict"
const menuBtn = document.querySelector('.js-menu__btn'),
      menu = document.querySelector('.js-menu'),
      overflow = document.querySelector('.js-menu__overlay');

// Menu
let x = window.matchMedia("(max-width: 799px)");

function initMenu(x) {
  if (x.matches) {
    menuBtn.addEventListener('click', function(event) {
      event.preventDefault();
      toggleMenu();
  });
  }
}

initMenu(x);


function toggleMenu() {

    if ((getComputedStyle(document.body).overflow) === 'visible') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    menuBtn.classList.toggle('header-menu__button_active');
    overflow.classList.toggle('header__overlay_active');
    menu.classList.toggle('header-menu__wrapper_active');
}

// Search
const searchBtn = document.querySelector('.header-search__icon'),
      searchField = document.querySelector('.header-search__field');

searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    showSearch();
});

function showSearch() {

    if ( searchField.classList.contains('header-search__field_show') ) {
      searchField.classList.toggle('header-search__field_fade');

      setTimeout(() => {
        searchField.classList.toggle('header-search__field_show');
    }, 300);
    } else {
      searchField.classList.toggle('header-search__field_show');

      setTimeout(() => {
        searchField.classList.toggle('header-search__field_fade');
    }, 10);
    }
}


// Share
const shareButton = document.querySelector('.forecast-header__share');

shareButton.addEventListener("click", async () => {
  try {
    await navigator.share({ title: "Матч Heroic — Natus Vincere", url: "" });
  } catch (err) {

  }
});


// Tabs

const tabsButtonsWrapper = document.querySelector('.betting-tabs__buttons'),
      tabsButton = document.querySelectorAll('.betting-tabs__button'),
      tabsContent = document.querySelectorAll('.betting-tabs__wrapper');


    tabsButtonsWrapper.addEventListener('click', function(event) {
    const target = event.target;
    if(target && target.classList.contains('betting-tabs__button')) {
            tabsButton.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
    }
  });

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('betting-tab_hide');
            item.classList.remove('betting-tab_show', 'betting-tab_fade');
        });

        tabsButton.forEach(item => {
            item.classList.remove('betting-tabs__button_active');
        });
	}

	function showTabContent(i) {
        tabsContent[i].classList.add('betting-tab_show', 'betting-tab_fade');
        tabsContent[i].classList.remove('betting-tab_hide');
        tabsButton[i].classList.add('betting-tabs__button_active');
    }
    
    hideTabContent();
    showTabContent(0);



// Slider
let width = 270;

const sliderWrapper = document.querySelector('.js-news-slider__wrapper'),
      slides = document.querySelectorAll('.js-news-slider__slide'),
      touchZone = document.querySelectorAll('.js-news-slider'),
      nextBtn = document.querySelector('.js-news-slider__next'),
      prevBtn = document.querySelector('.js-news-slider__prev');

let position = 0;

function initSlider(x) {
  if (x.matches) {
    width = 270;

    touchZone.forEach(slide => {
      slide.addEventListener('touchstart', handleTouchStart, {passive: true});
    });
    touchZone.forEach(slide => {
      slide.addEventListener('touchmove', handleTouchMove, {passive: true});
    });
  } else {
    width = 320;

    nextBtn.addEventListener('click', () => {
      moveToNextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
      moveToPrevSlide();
    });
  }
}

initSlider(x);


function moveToNextSlide() {
  if (position == (+width * (slides.length - 1))) {
        position = 0;
    } else {
        position += +width;
    }


    sliderWrapper.style.transform = `translateX(-${position}px)`;
}

function moveToPrevSlide() {
  if (position == 0) {
        position = +width * (slides.length - 1);
    } else {
        position -= +width;
    }

    sliderWrapper.style.transform = `translateX(-${position}px)`;
}


// swipe

let x1 = null;
let y1 = null;

function handleTouchStart(event) {
  const firstTouch = event.touches[0];

  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!x1 || !y1) {
    return false;
  }

  let  x2 = event.touches[0].clientX;
  let  y2 = event.touches[0].clientY;

  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    // move left - right or right - left
    if (xDiff > 0) {
      moveToPrevSlide();
    } else {
      moveToNextSlide();
    }
  }

  x1 = null;
  y1 = null;
}


// Load more

let anotherForecastWrapper = document.querySelector('.js-another-forecasts__wrapper'),
    anotherForecastItems = anotherForecastWrapper.querySelectorAll('.js-another-forecasts__item'),
    anotherForecastLoadMoreBtn = document.querySelector('.js-another-forecast__load-more'),
    newsWrapper = document.querySelector('.js-news-slider__wrapper'),
    newsItems = newsWrapper.querySelectorAll('.js-news-slider__slide'),
    newsLoadMoreBtn = document.querySelector('.js-news-slider__load-more'),
    bettingWrapperPrematch = document.querySelector('.js-betting__wrapper-prematch'),
    bettingItemsPrematch = bettingWrapperPrematch.querySelectorAll('.js-betting__tab-prematch'),
    bettingPrematchLoadMoreBtn = document.querySelector('.js-betting__tab-prematch-load-more'),
    bettingWrapperLive = document.querySelector('.js-betting__wrapper-live'),
    bettingItemsLive = bettingWrapperLive.querySelectorAll('.js-betting__tab-live'),
    bettingLiveLoadMoreBtn = document.querySelector('.js-betting__tab-live-load-more');

let slideToShow = 3;
let anotherForecasts = 3,
    news = 3,
    bettingPrematch = 1,
    bettingLive = 1;


      anotherForecastLoadMoreBtn.addEventListener('click', () => {

          anotherForecasts += 3;
  
          if (anotherForecasts <= anotherForecastItems.length) {
              for(let i = 3; i < anotherForecasts; i++){
                anotherForecastItems[i].style.display = '';
  
                anotherForecastItems[i].classList.add('fade-in-up');
              }
          }
  
          if (anotherForecasts == anotherForecastItems.length) {
            anotherForecastLoadMoreBtn.style.display = 'none';
          }
      });

      newsLoadMoreBtn.addEventListener('click', () => {

        news += 3;
  
          if (news <= newsItems.length) {
              for(let i = 3; i < news; i++){
                newsItems[i].style.display = '';
  
                newsItems[i].classList.add('fade-in-up');
              }
          }
  
          if (news == newsItems.length) {
            newsLoadMoreBtn.style.display = 'none';
          }
      });

      bettingPrematchLoadMoreBtn.addEventListener('click', () => {

        bettingPrematch += 1;
  
          if (bettingPrematch <= bettingItemsPrematch.length) {
              for(let i = 1; i < bettingPrematch; i++){
                bettingItemsPrematch[i].style.display = '';
  
                bettingItemsPrematch[i].classList.add('fade-in-up');
              }
          }
  
          if (bettingPrematch == bettingItemsPrematch.length) {
            bettingPrematchLoadMoreBtn.style.display = 'none';
          }
      });

      bettingLiveLoadMoreBtn.addEventListener('click', () => {

        bettingLive += 1;
  
          if (bettingLive <= bettingItemsLive.length) {
              for(let i = 1; i < bettingLive; i++){
                bettingItemsLive[i].style.display = '';
  
                bettingItemsLive[i].classList.add('fade-in-up');
              }
          }
  
          if (bettingLive == bettingItemsLive.length) {
            bettingLiveLoadMoreBtn.style.display = 'none';
          }
      });

      function hideContent(slides, countShowSlide) {

        for (countShowSlide; countShowSlide < slides.length; countShowSlide++) {
          slides[countShowSlide].style.display = 'none';
        }
      };

      function showContent(slides, loadMoreBtn, countSlideToShow) {

        slideToShow += countSlideToShow;
        console.log(`slideTo bef ${slideToShow}`);

        if (slideToShow <= slides.length) {
            for(let i = 3; i < slideToShow; i++){
                slides[i].style.display = '';

                slides[i].classList.add('fade-in-up');
                console.log(`slideTo aft ${slideToShow}`);
            }
        }

        if (slideToShow == slides.length) {
          loadMoreBtn.style.display = 'none';
        }
  };



hideContent(anotherForecastItems, 3);
hideContent(newsItems, 3);
hideContent(bettingItemsPrematch, 1);
hideContent(bettingItemsLive, 1);

});