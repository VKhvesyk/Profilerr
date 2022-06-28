document.addEventListener('DOMContentLoaded', function() {
"use strict"
const menuBtn = document.querySelector('.header-menu__button');
const menu = document.querySelector('.header-menu__wrapper');
const overflow = document.querySelector('.header__overlay');

// Menu

menuBtn.addEventListener('click', function(event) {
    event.preventDefault();
    toggleMenu();
});


function toggleMenu() {
    
    menuBtn.classList.toggle('header-menu__button_active');
    overflow.classList.toggle('header__overlay_active');
    menu.classList.toggle('header-menu__wrapper_active');
};

// Search
const logo = document.querySelector('.header-logo');
// const search = document.querySelector('.header-search');
const searchBtn = document.querySelector('.header-search__input');

searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    showSearch();
});

function showSearch() {
    logo.classList.toggle('header-logo_fade');
    search.classList.toggle('header-search_active');
    // searchInput.classList.toggle('_active');

    setTimeout(() => {
      logo.classList.toggle('header-logo_hide');
  }, 200);
};


// Share
const shareButton = document.querySelector('.forecast-header__share');

shareButton.addEventListener("click", async () => {
  try {
    await navigator.share({ title: "Матч Heroic — Natus Vincere", url: "" });
  } catch (err) {
    alert('К сожалению, ваше устройство не поддерживается');
  }
});


// Tabs

let tabs = document.querySelectorAll('.betting-tabs__button'),
		tabsContent = document.querySelectorAll('.betting-tab'),
		tabsParent = document.querySelector('.betting-tabs__buttons');

  tabsParent.addEventListener('click', function(event) {
    const target = event.target;
    if(target && target.classList.contains('betting-tabs__button')) {
            tabs.forEach((item, i) => {
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

        tabs.forEach(item => {
            item.classList.remove('betting-tabs__button_active');
        });
	}

	function showTabContent(i) {
        tabsContent[i].classList.add('betting-tab_show', 'betting-tab_fade');
        tabsContent[i].classList.remove('betting-tab_hide');
        tabs[i].classList.add('betting-tabs__button_active');
    }
    
    hideTabContent();
    showTabContent(0);



// Slider

let offset = 0;

const slides = document.querySelectorAll('.js-slider__slide'),
      prev = document.querySelector('.js-slider__prev'),
      next = document.querySelector('.js-slider__next'),
      slider = document.querySelector('.js-slider'),
      sliderWrapper = document.querySelector('.js-slider__wrapper'),
      width = window.getComputedStyle(slider).width,
      // slideWidth = document.querySelector('.js-slider__slide').clientWidth,
      touchZone = document.querySelectorAll('.js-slider__slide');


  sliderWrapper.style.width = (100 * slides.length) + '%';
  // sliderWrapper.style.width = (slideWidth * (slides.length + 1)) + ((slides.length) * 30) + 'px';
// sliderWrapper.style.width = 250 * (slides.length) + ((slides.length - 1) * 20) + 'px';

  sliderWrapper.style.transition = '0.5s all';
  slider.style.overflow = 'hidden';

  slides.forEach(slide => {
      slide.style.width = width;
  });

function moveToPrevSlide() {
    if (offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2);
    }

    sliderWrapper.style.transform = `translateX(-${offset}px)`;
}

function moveToNextSlide() {
    if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
    }

    sliderWrapper.style.transform = `translateX(-${offset}px)`;
}

// next.addEventListener('click', () => {

// });

// prev.addEventListener('click', () => {

// });

// swipe
touchZone.forEach(slide => {
  slide.addEventListener('touchstart', handleTouchStart, {passive: true});
});
touchZone.forEach(slide => {
  slide.addEventListener('touchmove', handleTouchMove, {passive: true});
});

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


});