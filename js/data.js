'use strict';
(function () {
  var COUNT_PHOTOS = 25;
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  window.renderPhoto = function (array) {
    var comments = array.comments.length;
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = array.url;
    photoElement.querySelector('.picture__stat--comments').textContent = comments;
    photoElement.querySelector('.picture__stat--likes').textContent = array.likes;
    return photoElement;
  };

  var onSuccessLoad = function (photos) {
    window.photos = photos;
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < COUNT_PHOTOS; j++) {
      fragment.appendChild(window.renderPhoto(photos[j]));
    }
    window.common.picturesList.appendChild(fragment);
    window.imgFilters.initImgFilters();
    window.initBigPicture();
  };

  var onErrorLoad = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 10; margin: 0 auto; background-color: red;';
    node.style.position = 'absolute';
    node.style.display = 'flex';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '20%';
    node.style.alignItems = 'center';
    node.style.justifyContent = 'center';
    node.style.width = '50%';
    node.style.height = '100px';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.isLoadData(onSuccessLoad, onErrorLoad);

})();
