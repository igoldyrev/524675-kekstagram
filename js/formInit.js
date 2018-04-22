'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imageSlider = document.querySelector('.img-upload__scale');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var imageUploadForm = document.querySelector('.img-upload__form');

  var clearFormInputs = function () {
    uploadFile.value = '';
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
    window.resize.resizeControlValue.value = '100%';
  };

  imageUploadForm.addEventListener('submit', function (evt) {
    window.backend.isUploadData(new FormData(imageUploadForm), function (response) {
      window.common.imageUploadElement.classList.add('hidden');
      clearFormInputs();
    });
    evt.preventDefault();
  });

  var onUploadFileClick = function () {
    window.common.imageUploadElement.classList.remove('hidden');
    imageSlider.classList.add('hidden');
    document.addEventListener('keydown', onEscKeyPress);
  };

  var onUploadCancelClick = function () {
    window.common.imageUploadElement.classList.add('hidden');
    clearFormInputs();
  };

  var onEscKeyPress = function (evt) {
    window.common.isEscEvent(evt, onUploadCancelClick);
  };

  uploadFile.addEventListener('change', onUploadFileClick);
  uploadCancel.addEventListener('click', onUploadCancelClick);


  window.form = {
    onUploadCancelClick: onUploadCancelClick
  };
})();
