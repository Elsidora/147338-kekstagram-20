'use strict';

window.util = (function () {

  return {
    isEscapeEvent: function (evt, action) {
      if (evt.key === 'Escape') {
        action();
      }
    },

    // Функция нахождения случайного целого числа
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    // Функция создания массива уникальных чисел
    getUniqueArray: function (min, max) {
      var myArray = [];

      for (var j = 0; myArray.length < max; j++) {
        var randomNumber = window.util.getRandomNumber(min, max);
        var found = false;
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i] === randomNumber) {
            found = true;
            break;
          }
        }
        if (!found) {
          myArray[myArray.length] = randomNumber;
        }
      }
      return myArray.slice(0, 10);
    },

    // Функция очистки галереи
    clearGallery: function (className, container) {
      var picturesToRemove = document.querySelectorAll(className);
      picturesToRemove.forEach(function (item) {
        container.removeChild(item);
      });
    }
  };
})();
