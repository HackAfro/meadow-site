(function () {
    'use strict';

    const nav = document.querySelector('.dropdown-nav');
    const menuButton = document.querySelector('.menu-button');

    menuButton.addEventListener('click', toggleNav);

    function toggleNav() {
        if (nav.classList.contains('hide')) {
            nav.classList.remove('hide');
            nav.classList.add('reveal');
        } else {
            nav.classList.remove('reveal');
            nav.classList.add('hide');
        }
    }
})();