'use strict';

(function () {
  var Effect = {
    MAX_VALUE: 100,
    MIN_VALUE: 0
  };

  var effectImg = {
    chrome: {
      filter: 'grayscale',
      min: 0,
      max: 1,
      unit: ''
    },
    sepia: {
      filter: 'sepia',
      min: 0,
      max: 1,
      unit: ''
    },
    marvin: {
      filter: 'invert',
      min: 0,
      max: 100,
      unit: '%'
    },
    phobos: {
      filter: 'blur',
      min: 0,
      max: 3,
      unit: 'px'
    },
    heat: {
      filter: 'brightness',
      min: 1,
      max: 3,
      unit: ''
    }
  };

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var previewImage = imgUploadPreview.querySelector('.img-upload__preview img');

  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  effectLevel.classList.add('hidden');

  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');


  // функция для расчета насыщенности эффекта
  function getEffectValue(min, max, valuePin) {
    return min + (max - min) * (valuePin / Effect.MAX_VALUE);
  }

  // Функция изменения эффекта при перемещении пина
  function changeEffect(effect, valuePin) {
    var minValueEffect = effect.min;
    var maxValueEffect = effect.max;
    var valueEffect = getEffectValue(minValueEffect, maxValueEffect, valuePin); // расчитывается значение насыщенности эффекта
    effectLevelValue.value = valuePin; // уровень эффекта, определяемый координатой перемещения пина
    previewImage.style.filter = effect.filter + '(' + valueEffect + effect.unit + ')'; // стили превьюшки
  }

  // Функция наложения эффекта на изображение, делегирование

  var currentEffect = null;

  function onInputRadioClick(evt) {
    var target = evt.target;
    if (target.name === 'effect') {
      if (target.value === 'none') { // если выбран эффект "Оригинал"
        effectLevel.classList.add('hidden'); // слайдер с пином скрывается
        previewImage.classList.remove('effects__preview--' + currentEffect); // у превью фотки удаляется текущий класс
        previewImage.style = ''; // и сбрасываются стили
        return;
      }
      previewImage.classList.remove('effects__preview--' + currentEffect); // удаляется текущий класс
      currentEffect = target.value; // текущий эффект равен значению атрибута value нажатой радиокнопки
      previewImage.classList.add('effects__preview--' + currentEffect); // превьюшке добавляется класс со значением текущего эффекта
      effectLevelPin.style.left = '100%'; // координата пина слева становится 100%
      effectLevelDepth.style.width = '100%'; // ширина закрашенного блока 100%
      changeEffect(effectImg[currentEffect], Effect.MAX_VALUE); // то, что происходит при изменении эффекта
      effectLevel.classList.remove('hidden'); // показываем слайдер с пином
    }
  }

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

      changeEffect(effectImg[currentEffect], effectLevelPinLeft);

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

  window.effects = {
    radioClick: onInputRadioClick,
    movePin: onMouseDown
  };

})();
