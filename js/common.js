'use strict';

window.common = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    isGetRandom: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    isDebounce: function (func) {

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
    },
    imageUploadElement: document.querySelector('.img-upload__overlay'),
    imageUploadImg: document.querySelector('.img-upload__preview img'),
    picturesList: document.querySelector('.pictures')
  };
})();
