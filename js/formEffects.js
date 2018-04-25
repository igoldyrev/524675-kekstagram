'use strict';
(function () {
  var SLIDER_WIDTH = 495;
  var SCALE_MAX = 100;
  var imageUploadEffects = document.querySelector('.effects__list');
  var imageSlider = document.querySelector('.img-upload__scale');
  var resizeControl = document.querySelector('.resize');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var scaleValue = document.querySelector('.scale__value');

  var onEffectsRadioClick = function (evt) {
    var setEffect = function (eff) {
      window.common.imageUploadImg.className = '';
      var effect = 'effects__preview--' + eff;
      window.common.imageUploadImg.classList.add(effect);
      imageSlider.classList.remove('hidden');
      resizeControl.style.zIndex = 1;
    };

    var effectId = evt.target.id.replace('effect-', '');
    if (effectId === 'none') {
      window.common.imageUploadImg.removeAttribute('class');
      imageSlider.classList.add('hidden');
      window.common.imageUploadImg.style = '';
      window.resize.resizeControlValue.value = '100%';
    } else {
      setEffect(effectId);
      scalePin.style.left = '100%';
      scaleLevel.style.width = '100%';
      setSaturation(100);
    }
  };

  var setSaturation = function (position) {
    var filterName = window.common.imageUploadImg.classList.value.split('--')[1];

    var result;

    switch (filterName) {
      case 'chrome':
        result = 'grayscale(' + (position / 100) + ')';
        break;
      case 'sepia':
        result = 'sepia(' + (position / 100) + ')';
        break;
      case 'marvin':
        result = 'invert(' + position + '%)';
        break;
      case 'phobos':
        result = 'blur(' + (position * 3 / 100) + 'px)';
        break;
      case 'heat':
        result = 'brightness(' + ((position * 2 / 100) + 1) + ')';
        break;
    }

    window.common.imageUploadImg.style.filter = result;
    scaleValue.value = position;
  };
  var onScalePinMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var pinPosition = Number.parseInt(scalePin.style.left, 10);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      var diff = shift.x / SLIDER_WIDTH * SCALE_MAX;

      diff = (pinPosition - Math.round(diff));

      if (diff < 0) {
        diff = 0;
      } else if (diff > SCALE_MAX) {
        diff = SCALE_MAX;
      }

      scalePin.style.left = diff + '%';
      scaleLevel.style.width = diff + '%';

      setSaturation(diff);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  scalePin.addEventListener('mousedown', onScalePinMouseDown);

  window.formEffects = {
    addListenersFormEffects: function () {
      imageUploadEffects.addEventListener('click', onEffectsRadioClick);
    },
    removeListenersFormEffects: function () {
      imageUploadEffects.removeEventListener('click', onEffectsRadioClick);
    }
  };
})();
