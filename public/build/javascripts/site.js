/**
 * Created by Afro on 1/17/2018.
 */
import Typed from 'typed.js';

(function() {
  'use strict';

  const nav = document.querySelector('.dropdown-nav');
  const menuButton = document.querySelector('.menu-button');

  menuButton.addEventListener('click', toggleNav);

  // Expandable menu displayed on mobile. Function to toggle visibility
  function toggleNav() {
    if (nav.classList.contains('hide')) {
      nav.classList.remove('hide');
      nav.classList.add('reveal');
    } else {
      nav.classList.remove('reveal');
      nav.classList.add('hide');
    }
  }

  // Get the href string without the forward slashes
  const stripSlashes = href => {
    if (typeof href !== 'string') return; // if href isn't a string, return
    const hrefList = [...href]; // Spread the string to create a list
    return hrefList
      .filter(letter => letter !== '/')
      .join('')
      .toLowerCase(); // filter all string that isn't a
    // forward slash then join the list and
    // return
  };

  try {
    const href = window.location.pathname; // Get the current relative url of the page;
    const pathStr = stripSlashes(href);

    const navItems = [...document.querySelectorAll('.nav-item')]; // Get all the nav items
    navItems.forEach(item => {
      if (item.attributes.href === undefined) return; // If element has no href attribute,return

      if (stripSlashes(item.attributes.href.value) === pathStr) {
        // Iterate through navItems list and find navItem who's text matches pathStr
        item.classList.add('active'); // if elements href value matches path string, add the active class to it
      }
    });
  } catch (err) {
    console.log(err);
  }
  $('.fade').slick({
    dots: true,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dots: false
  });

  const options = {
    strings: [
      '',
      'We aim to improve food security <br/> in Africa',
      'We aim to solve food problems by working with our local communities to create opportunities'
    ],
    startDelay: 300,
    typeSpeed: 90,
    backSpeed: 40,
    backDelay: 3000,
    showCursor: true,
    autoInsertCss: true,
    loop: true
  };
  const typed = new Typed('.typed', options);
})();
