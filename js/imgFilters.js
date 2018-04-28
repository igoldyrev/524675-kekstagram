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

    var photosCopy = window.photos.slice();

    var clearFilterButtonsClasses = function () {
      imageFilterButton.forEach(function (button) {
        button.classList.remove('img-filters__button--active');
      });
    };

    var clearChilds = function () {
      var pictureLinks = document.querySelectorAll('.picture__link');
      pictureLinks.forEach(function (link) {
        link.remove();
      });
    };

    var renderFilter = function (array) {
      clearChilds();
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < array.length; j++) {
        fragment.appendChild(window.renderPhoto(array[j]));
      }
      window.common.picturesList.appendChild(fragment);
    };

    var sortPopular = function () {
      clearFilterButtonsClasses();
      filterPopular.classList.add('img-filters__button--active');
      var sortLikes = window.photos.slice().sort(function (first, second) {
        if (first.likes > second.likes) {
          return 1;
        } else if (first.likes < second.likes) {
          return -1;
        } else {
          return 0;
        }
      }).reverse();
      window.photos = sortLikes;
      renderFilter(sortLikes);
      window.initBigPicture();
    };

    var sortRecommended = function () {
      clearFilterButtonsClasses();
      filterRecommended.classList.add('img-filters__button--active');
      window.photos = photosCopy;
      renderFilter(photosCopy);
      window.initBigPicture();
    };

    var sortRandom = function () {
      clearFilterButtonsClasses();
      filterRandom.classList.add('img-filters__button--active');
    };

    var sortDiscussed = function () {
      clearFilterButtonsClasses();
      filterDiscussed.classList.add('img-filters__button--active');
      var sortComents = window.photos.slice().sort(function (first, second) {
        if (first.comments.length > second.comments.length) {
          return 1;
        } else if (first.comments.length < second.comments.length) {
          return -1;
        } else {
          return 0;
        }
      }).reverse();
      window.photos = sortComents;
      renderFilter(sortComents);
      window.initBigPicture();
    };

    filterPopular.addEventListener('click', sortPopular);
    filterRecommended.addEventListener('click', sortRecommended);
    filterRandom.addEventListener('click', sortRandom);
    filterDiscussed.addEventListener('click', sortDiscussed);
  };
})();
