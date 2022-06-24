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
// const searchInput = document.querySelector('');
const searchBtn = document.querySelector('.header-search__icon');

searchBtn.addEventListener('click', function(event) {
    event.preventDefault();
    showSearch();
});

function showSearch() {
    logo.classList.toggle('header-logo_hide');
    // seachBtn.classList.toggle('_active');
    // searchInput.classList.toggle('_active');
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
