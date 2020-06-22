'use strict';

(function () {

  var effectLevel = document.querySelector('.effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');


  function onMouseDown(evt) {
    evt.preventDefault();
    var startX = evt.clientX; // запоминаем координаты точки, с которой начали перемещать мышь

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      // обновляем смещение относительно первоначальной точки
      var shift = startX - moveEvt.clientX;
      var effectLevelLineLeft = effectLevelLine.getBoundingClientRect().left; // определяеем координаты левой границы воображаемого прямоугольника относительно окна браузера для контейнера effect-level__line
      var effectLevelPinLeft = (startX - shift - effectLevelLineLeft) / effectLevel.offsetWidth * 100; // горизонтальная координата смещения пина при перетаскивании
      effectLevelPinLeft = Math.round(effectLevelPinLeft);
      if (effectLevelPinLeft < 0 || effectLevelPinLeft > 100) {
        return;
      }

      effectLevelPin.style.left = effectLevelPinLeft + '%';
      effectLevelDepth.style.width = effectLevelPinLeft + '%';

    }

    // при отпускании мыши перестаем слушать события движения мыши и отпускания ее кнопки
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove); // слушаем событие передвижения мыши
    document.addEventListener('mouseup', onMouseUp); // ... отпускания кнопки мыши
  }

  window.pin = {
    movePin: onMouseDown
  };

})();
