'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imageUploadElement = document.querySelector('.img-upload__overlay');
  var imageUploadEffects = imageUploadElement.querySelector('.effects__list');
  var imageUploadImg = imageUploadElement.querySelector('.img-upload__preview img');
  var imageSlider = imageUploadElement.querySelector('.img-upload__scale');
  var scalePin = imageUploadElement.querySelector('.scale__pin');
  var scaleLevel = imageUploadElement.querySelector('.scale__level');
  var scaleValue = imageUploadElement.querySelector('.scale__value');

  var onUploadFileClick = function () {
    imageUploadElement.classList.remove('hidden');
    resizeControlValue.value = '100%';
    imageSlider.classList.add('hidden');
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
    document.addEventListener('keydown', onEscKeyPress);
  };

  var onUploadCancelClick = function () {
    imageUploadElement.classList.add('hidden');
    uploadFile.value = '';
  };

  var onEscKeyPress = function (evt) {
    window.util.isEscEvent(evt, onUploadCancelClick);
  };

  uploadFile.addEventListener('change', onUploadFileClick);
  uploadCancel.addEventListener('click', onUploadCancelClick);

  var onEffectsRadioClick = function (evt) {
    var setEffect = function (eff) {
      imageUploadImg.className = '';
      var effect = 'effects__preview--' + eff;
      imageUploadImg.classList.add(effect);
      imageSlider.classList.remove('hidden');
      resizeControl.style.zIndex = 1;
    };

    var effectId = evt.target.id.replace('effect-', '');
    if (effectId === 'none') {
      imageUploadImg.removeAttribute('class');
      imageSlider.classList.add('hidden');
    } else {
      setEffect(effectId);
    }
  };

  imageUploadEffects.addEventListener('click', onEffectsRadioClick);

  var resizeControl = imageUploadElement.querySelector('.resize');
  var resizeControlMinus = imageUploadElement.querySelector('.resize__control--minus');
  var resizeControlValue = imageUploadElement.querySelector('.resize__control--value');
  var resizeControlPlus = imageUploadElement.querySelector('.resize__control--plus');

  var resizeImg = function (evt) {
    var scale;
    var currentValue = Number.parseInt(resizeControlValue.value, 10);

    if (evt.target === resizeControlMinus) {
      if (currentValue > 25) {
        currentValue -= 25;
      }
    } else if (evt.target === resizeControlPlus) {
      if (currentValue < 100) {
        currentValue += 25;
      }
    }

    scale = 'scale(0.' + currentValue + ')';

    resizeControlValue.value = (currentValue + '%');
    imageUploadImg.style.transform = scale;

    if (currentValue === 100) {
      imageUploadImg.removeAttribute('style');
    }
  };

  resizeControlMinus.addEventListener('click', resizeImg);
  resizeControlPlus.addEventListener('click', resizeImg);

  document.querySelector('.img-upload__submit').addEventListener('click', onInputTagValidation);
  var inputTagUpload = document.querySelector('.text__hashtags');
  var inputTextDescription = document.querySelector('.text__description');
  var validateTags = function (string) {
    var errors = [];
    var stringSmallCase = string.toString().toLowerCase();
    var tags = stringSmallCase.split(' ');
    tags.forEach(function (tag) {
      tag = tag.trim();
      if (tag[0] !== '#') {
        errors.push('Теги должны начинаться с #');
      } else if (tag.length <= 1) {
        errors.push('Теги должны содержать не менее 2 символов');
      } else if (tag.length > 20) {
        errors.push('Теги должны содержать не более 20 символов');
      }
    });
    if (tags.length > 5) {
      errors.push('Максимальное количество тегов - 5');
    }
    var tag;
    while (tags.length) {
      tag = tags.pop();
      if (tags.indexOf(tag) !== -1) {
        errors.push('Теги не должны совпадать. Регистр не учитывается.');
      }
    }
    return errors;
  };

  var onInputTagValidation = function () {
    var input = document.querySelector('.text__hashtags');
    var errorList = validateTags(input.value);
    if (errorList.length > 0) {
      input.setCustomValidity(errorList.toString());
      input.style.border = '2px solid red';
    } else {
      input.setCustomValidity('');
    }
  };

  var onInputFocusLost = function () {
    document.addEventListener('keydown', onEscKeyPress);
  };

  var onInputFocus = function () {
    document.removeEventListener('keydown', onEscKeyPress);
  };

  inputTagUpload.addEventListener('focus', onInputFocus);
  inputTagUpload.addEventListener('blur', onInputTagValidation);
  inputTagUpload.addEventListener('blur', onInputFocusLost);
  inputTextDescription.addEventListener('focus', onInputFocus);
  inputTextDescription.addEventListener('blur', onInputFocusLost);


  var setSaturation = function (position) {
    var filterName = imageUploadImg.classList.value;
    filterName = filterName.split('--');
    filterName = filterName[1];

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

    imageUploadImg.style.filter = result;
    scaleValue.value = position;
  };


  var SLIDER_WIDTH = 495;
  var SCALE_MAX = 100;
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
})();
