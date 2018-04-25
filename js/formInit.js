'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imageSlider = document.querySelector('.img-upload__scale');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var imageUploadForm = document.querySelector('.img-upload__form');

  var clearFormInputs = function () {
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
    window.resize.resizeControlValue.value = '100%';
    window.common.imageUploadImg.style.transform = '';
    window.common.imageUploadImg.style.filter = '';
    window.common.imageUploadImg.className = '';
    window.validateTags.inputTagUpload.value = '';
    window.validateTags.inputTextDescription.value = '';
    document.querySelector('#effect-none').checked = true;
  };

  var clearAllFormListeners = function () {
    window.formEffects.removeListenersFormEffects();
    window.resize.removeListenersResize();
    window.validateTags.removeListenersValidateTags();
  };

  imageUploadForm.addEventListener('submit', function (evt) {
    window.backend.isUploadData(new FormData(imageUploadForm), function () {
      window.common.imageUploadElement.classList.add('hidden');
      uploadFile.value = '';
      clearFormInputs();
      clearAllFormListeners();
    }, function () {
      var errorMessage = document.querySelector('.img-upload__message--error');
      var errorLink = document.querySelector('.error__link');
      errorMessage.classList.remove('hidden');
      errorMessage.style.zIndex = '3';
      errorLink.addEventListener('click', function () {
        errorMessage.classList.add('hidden');
      });
    });
    evt.preventDefault();
  });

  var onUploadFileClick = function () {
    window.common.imageUploadElement.classList.remove('hidden');
    imageSlider.classList.add('hidden');
    document.addEventListener('keydown', onEscKeyPress);
    clearFormInputs();
    window.formEffects.addListenersFormEffects();
    window.resize.addListenersResize();
    window.validateTags.addListenersValidateTags();
  };

  var onUploadCancelClick = function () {
    window.common.imageUploadElement.classList.add('hidden');
    uploadFile.value = '';
    clearFormInputs();
    clearAllFormListeners();
  };

  var onEscKeyPress = function (evt) {
    window.common.isEscEvent(evt, onUploadCancelClick);
  };
  var onEnterKeyPress = function (evt) {
    window.common.isEnterEvent(evt, onUploadFileClick);
  };

  uploadFile.addEventListener('change', onUploadFileClick);
  uploadFile.addEventListener('keydown', onEnterKeyPress);
  uploadCancel.addEventListener('click', onUploadCancelClick);


  window.formInit = {
    onUploadCancelClick: onUploadCancelClick
  };
})();
