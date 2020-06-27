'use strict';

(function () {

  var Scale = {
    MAX_VALUE: 1,
    MIN_VALUE: 0.25
  };

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var scaleValue = imgUploadOverlay.querySelector('.scale__control--value');

  // Функции изменения размера изображения
  var pictureScale = Scale.MAX_VALUE;

  function changeSizeImage(minValue) {
    scaleValue.value = scaleValue.value.slice(0, -1) - minValue * 100 + '%';
    imgUploadPreview.style = 'transform:scale(' + (pictureScale - minValue) + ')';
    pictureScale -= minValue;
  }

  function onScaleSmallerClick() {
    if (pictureScale >= Scale.MIN_VALUE * 2 && pictureScale <= Scale.MAX_VALUE) {
      changeSizeImage(Scale.MIN_VALUE);
    }
  }

  function onScaleBiggerClick() {
    if (pictureScale >= Scale.MIN_VALUE && pictureScale <= Scale.MAX_VALUE - Scale.MIN_VALUE) {
      changeSizeImage(-Scale.MIN_VALUE);
    }
  }

  window.size = {
    minusClick: onScaleSmallerClick,
    plusClick: onScaleBiggerClick
  };

})();
