'use strict';

(function () {

  var hashtags = document.querySelector('.text__hashtags');

  function onValidateHashtags(evt) {
    evt.preventDefault();
    var arrayOfHashtags = hashtags.value.trim().toLowerCase().split(/\s{1,}/g);
    var arrayOfHashtagsLength = arrayOfHashtags.length;
    var arrayOfHashtagsCopy = arrayOfHashtags.slice();

    if (arrayOfHashtagsLength > 5) {
      hashtags.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
      return;
    }
    for (var i = 0; i < arrayOfHashtagsLength; i += 1) {
      var arrayOfHashtagsSplice = arrayOfHashtagsCopy.splice(0, 1);
      if (arrayOfHashtags[i][0] !== '#') {
        hashtags.setCustomValidity('Хэш-тег должен начинаться с символа # (решётка)');
        break;
      }
      if (arrayOfHashtags[i].length < 2) {
        hashtags.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
        break;
      }
      if (arrayOfHashtags[i].length > 20) {
        hashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        break;
      }
      if (arrayOfHashtags[i].lastIndexOf('#') !== 0) {
        hashtags.setCustomValidity('Хэш-теги разделяются пробелами');
        break;
      }
      if (arrayOfHashtagsCopy.includes(arrayOfHashtagsSplice[0])) {
        hashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        break;
      }
      if (!arrayOfHashtags[i].match('^#[A-Za-z0-9]+$')) {
        hashtags.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т.д.');
        break;
      }
      hashtags.setCustomValidity('');

    }
  // hashtags.setCustomValidity('');
  }

  window.hashtags = {
    validate: onValidateHashtags
  };

})();
