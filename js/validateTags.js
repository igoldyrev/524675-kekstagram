'use strict';
(function () {
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
    if (input.value === '') {
      errorList.length = 0;
      input.setCustomValidity('');
    } else if (errorList.length > 0) {
      input.setCustomValidity(errorList.toString());
      input.style.border = '2px solid red';
    }
  };

  var onEscKeyPress = function (evt) {
    window.common.isEscEvent(evt, window.formInit.onUploadCancelClick);
  };

  var onInputFocusLost = function () {
    document.addEventListener('keydown', onEscKeyPress);
  };

  var onInputFocus = function () {
    document.removeEventListener('keydown', onEscKeyPress);
  };

  document.querySelector('.img-upload__submit').addEventListener('click', onInputTagValidation);

  window.validateTags = {
    inputTagUpload: inputTagUpload,
    inputTextDescription: inputTextDescription,
    addListenersValidateTags: function () {
      inputTagUpload.addEventListener('focus', onInputFocus);
      inputTagUpload.addEventListener('blur', onInputTagValidation);
      inputTagUpload.addEventListener('blur', onInputFocusLost);
      inputTextDescription.addEventListener('focus', onInputFocus);
      inputTextDescription.addEventListener('blur', onInputFocusLost);
    },
    removeListenersValidateTags: function () {
      inputTagUpload.removeEventListener('focus', onInputFocus);
      inputTagUpload.removeEventListener('blur', onInputTagValidation);
      inputTagUpload.removeEventListener('blur', onInputFocusLost);
      inputTextDescription.removeEventListener('focus', onInputFocus);
      inputTextDescription.removeEventListener('blur', onInputFocusLost);
    }
  };
})();
