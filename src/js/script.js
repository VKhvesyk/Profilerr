"use strict"
const menuBtn = document.querySelector('.header-menu__btn');
const menu = document.querySelector('.header-menu__wrapper');
const overflow = document.querySelector('.header__overlay');

// Menu

menuBtn.addEventListener('click', function(event) {
    event.preventDefault();
    toggleMenu();
});


function toggleMenu() {
    
    menuBtn.classList.toggle('header-menu__btn_active');
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