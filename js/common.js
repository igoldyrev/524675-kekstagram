'use strict';

window.common = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
    imageUploadElement: document.querySelector('.img-upload__overlay'),
    imageUploadImg: document.querySelector('.img-upload__preview img'),
    picturesList: document.querySelector('.pictures')
  };
})();
