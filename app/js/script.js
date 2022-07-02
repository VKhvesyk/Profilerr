document.addEventListener('DOMContentLoaded', function() {
"use strict"
const menuBtn = document.querySelector('.header-menu__button');
const menu = document.querySelector('.header-menu__wrapper');
const overflow = document.querySelector('.header__overlay');

// Menu
let x = window.matchMedia("(max-width: 799px)");
console.log(x);

function initMenu(x) {
  if (x.matches) {
    menuBtn.addEventListener('click', function(event) {
      event.preventDefault();
      toggleMenu();
  });
  }
};

initMenu(x);

// menuBtn.addEventListener('click', function(event) {
//     event.preventDefault();
//     toggleMenu();
// });


function toggleMenu() {

    if ((getComputedStyle(document.body).overflow) === 'visible') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    menuBtn.classList.toggle('header-menu__button_active');
    overflow.classList.toggle('header__overlay_active');
    menu.classList.toggle('header-menu__wrapper_active');
};

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
};


// Share
const shareButton = document.querySelector('.forecast-header__share');

shareButton.addEventListener("click", async () => {
  try {
    await navigator.share({ title: "Матч Heroic — Natus Vincere", url: "" });
  } catch (err) {

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
let width = 270;

const sliderWrapper = document.querySelector('.js-slider__wrapper'),
      slides = document.querySelectorAll('.js-slider__slide'),
      touchZone = document.querySelectorAll('.js-slider'),
      nextBtn = document.querySelector('.js-slider__next'),
      prevBtn = document.querySelector('.js-slider__prev');

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
};

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


});