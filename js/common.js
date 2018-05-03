'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;

  var imageUploadElement = document.querySelector('.img-upload__overlay');
  var imageUploadImg = document.querySelector('.img-upload__preview img');
  var picturesList = document.querySelector('.pictures');

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };
  var isGetRandom = function () {
    return Math.random() - 0.5;
  };
  var isDebounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };

  window.common = {
    imageUploadElement: imageUploadElement,
    imageUploadImg: imageUploadImg,
    picturesList: picturesList,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isGetRandom: isGetRandom,
    isDebounce: isDebounce
  };
})();
