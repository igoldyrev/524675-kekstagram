'use strict';
(function () {
  window.onload = function () {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

    var imageFilterButton = document.querySelectorAll('.img-filters__button');
    var filterRecommended = document.querySelector('#filter-recommended');
    var filterPopular = document.querySelector('#filter-popular');
    var filterRandom = document.querySelector('#filter-random');
    var filterDiscussed = document.querySelector('#filter-discussed');

    var clearFilterButtonsClasses = function () {
      imageFilterButton.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      });
    };

    filterPopular.addEventListener('click', function () {
      clearFilterButtonsClasses();
      filterPopular.classList.add('img-filters__button--active');
    });

    filterRecommended.addEventListener('click', function () {
      clearFilterButtonsClasses();
      filterRecommended.classList.add('img-filters__button--active');
    });

    filterRandom.addEventListener('click', function () {
      clearFilterButtonsClasses();
      filterRandom.classList.add('img-filters__button--active');
    });

    filterDiscussed.addEventListener('click', function () {
      clearFilterButtonsClasses();
      filterDiscussed.classList.add('img-filters__button--active');
    });
  };
})();
