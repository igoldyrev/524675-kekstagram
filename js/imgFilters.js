'use strict';
(function () {
  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

  var imageFilterButton = document.querySelectorAll('.img-filters__button');
  var filterRecommended = document.querySelector('#filter-recommended');
  var filterPopular = document.querySelector('#filter-popular');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var photosCopy;

  var clearFilterButtonsClasses = function () {
    imageFilterButton.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
  };

  var addFilterButtonClass = function (button) {
    clearFilterButtonsClasses();
    button.classList.add('img-filters__button--active');
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
    addFilterButtonClass(filterPopular);

    var sortElemPopular = function () {
      var sortLikes = window.photos.slice().sort(function (first, second) {
        return first.likes - second.likes;
      }).reverse();
      window.photos = sortLikes;
      renderFilter(sortLikes);
      window.initBigPicture();
    };
    window.common.isDebounce(sortElemPopular);
  };

  var sortRecommended = function () {
    addFilterButtonClass(filterRecommended);

    var sortElemRecommend = function () {
      window.photos = photosCopy;
      window.common.isDebounce(renderFilter(photosCopy));
      window.initBigPicture();
    };
    window.common.isDebounce(sortElemRecommend);
  };

  var sortRandom = function () {
    addFilterButtonClass(filterRandom);

    var sortElemRandom = function () {
      var sortRand = window.photos.slice().sort(window.common.isGetRandom);
      window.photos = sortRand;
      window.common.isDebounce(renderFilter(sortRand));
      window.initBigPicture();
    };
    window.common.isDebounce(sortElemRandom);

  };

  var sortDiscussed = function () {
    addFilterButtonClass(filterDiscussed);

    var sortElemDiscussed = function () {
      var sortComents = window.photos.slice().sort(function (first, second) {
        return first.comments.length - second.comments.length;
      }).reverse();
      window.photos = sortComents;
      renderFilter(sortComents);
      window.initBigPicture();
    };
    window.common.isDebounce(sortElemDiscussed);
  };

  var initImgFilters = function () {
    photosCopy = window.photos.slice();
    filterPopular.addEventListener('click', sortPopular);
    filterRecommended.addEventListener('click', sortRecommended);
    filterRandom.addEventListener('click', sortRandom);
    filterDiscussed.addEventListener('click', sortDiscussed);
  };

  window.imgFilters = {
    initImgFilters: initImgFilters
  };
})();
