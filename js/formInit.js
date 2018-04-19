'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imageSlider = document.querySelector('.img-upload__scale');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');

  var onUploadFileClick = function () {
    window.common.imageUploadElement.classList.remove('hidden');
    window.resize.resizeControlValue.value = '100%';
    imageSlider.classList.add('hidden');
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
    document.addEventListener('keydown', onEscKeyPress);
  };

  var onUploadCancelClick = function () {
    window.common.imageUploadElement.classList.add('hidden');
    uploadFile.value = '';
  };

  var onEscKeyPress = function (evt) {
    window.common.isEscEvent(evt, onUploadCancelClick);
  };

  uploadFile.addEventListener('change', onUploadFileClick);
  uploadCancel.addEventListener('click', onUploadCancelClick);


  window.form = {
    onUploadCancelClick
  };
})();
