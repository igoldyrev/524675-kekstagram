'use strict';
(function () {
  var resizeControlMinus = document.querySelector('.resize__control--minus');
  var resizeControlValue = document.querySelector('.resize__control--value');
  var resizeControlPlus = document.querySelector('.resize__control--plus');

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
    window.common.imageUploadImg.style.transform = scale;

    if (currentValue === 100) {
      window.common.imageUploadImg.removeAttribute('style');
    }
  };

  window.resize = {
    resizeControlValue: resizeControlValue,
    addListenersResize: function () {
      resizeControlMinus.addEventListener('click', resizeImg);
      resizeControlPlus.addEventListener('click', resizeImg);
    },
    removeListenersResize: function () {
      resizeControlMinus.removeEventListener('click', resizeImg);
      resizeControlPlus.removeEventListener('click', resizeImg);
    }
  };
})();
