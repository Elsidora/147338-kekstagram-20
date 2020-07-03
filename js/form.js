'use strict';

(function () {

  var TIMEOUT = 3000;
  var body = document.querySelector('body');
  var form = body.querySelector('.img-upload__form');
  var uploadFile = form.querySelector('#upload-file');
  var imgUploadOverlay = form.querySelector('.img-upload__overlay');
  var imgPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var imgUploadPreview = imgPreview.querySelector('.img-upload__preview img');
  var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var hashtags = imgUploadOverlay.querySelector('.text__hashtags');
  var textDescription = imgUploadOverlay.querySelector('.text__description');
  var imgUploadEffects = imgUploadOverlay.querySelector('.img-upload__effects');
  var scaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
  var scaleValue = imgUploadOverlay.querySelector('.scale__control--value');

  function onEscapePress(evt) {
    window.util.isEscapeEvent(evt, closeFormEditPhoto);
  }

  function defaultStyle() {
    scaleValue.value = '100%';
    imgPreview.style = 'transform:scale(1)';
    imgUploadPreview.className = '';
    effectsRadio[0].checked = true;
    hashtags.style = '';
    uploadFile.value = '';
    imgUploadEffectLevel.classList.add('hidden');
  }

  function openFormEditPhoto() {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscapePress);

    body.classList.add('modal-open');
    imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
    scaleSmaller.addEventListener('click', window.size.minusClick);
    scaleBigger.addEventListener('click', window.size.plusClick);
    imgUploadEffects.addEventListener('click', window.effects.radioClick);
    effectLevelPin.addEventListener('mousedown', window.effects.mouseDown);
    hashtags.addEventListener('input', window.hashtags.validate);

    hashtags.addEventListener('focus', onHashtagsFocus);
    hashtags.addEventListener('blur', onHashtagsBlur);
    textDescription.addEventListener('focus', onTextDescriptionFocus);
    textDescription.addEventListener('blur', onTextDescriptionBlur);
    form.addEventListener('submit', onFormSubmit);
    uploadFile.removeEventListener('change', onUploadFileChange);
    uploadFile.blur();
  }

  function closeFormEditPhoto() {
    imgUploadOverlay.classList.add('hidden');
    form.reset();
    defaultStyle();
    document.removeEventListener('keydown', onEscapePress);

    body.classList.remove('modal-open');
    imgUploadCancel.removeEventListener('click', onImgUploadCancelClick);
    scaleSmaller.removeEventListener('click', window.size.minusClick);
    scaleBigger.removeEventListener('click', window.size.plusClick);
    imgUploadEffects.removeEventListener('click', window.effects.radioClick);
    effectLevelPin.removeEventListener('mousedown', window.effects.mouseDown);
    hashtags.removeEventListener('input', window.hashtags.validate);

    hashtags.removeEventListener('focus', onHashtagsFocus);
    hashtags.removeEventListener('blur', onHashtagsBlur);
    textDescription.removeEventListener('focus', onTextDescriptionFocus);
    textDescription.removeEventListener('blur', onTextDescriptionBlur);
    form.removeEventListener('submit', onFormSubmit);
    uploadFile.addEventListener('change', onUploadFileChange);
  }

  function onImgUploadCancelClick(evt) {
    evt.preventDefault();
    closeFormEditPhoto();
  }

  function onTextDescriptionFocus(evt) {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscapePress);
  }

  function onTextDescriptionBlur(evt) {
    evt.preventDefault();
    document.addEventListener('keydown', onEscapePress);
  }

  function onHashtagsFocus(evt) {
    evt.preventDefault();
    document.removeEventListener('keydown', onEscapePress);
  }

  function onHashtagsBlur(evt) {
    evt.preventDefault();
    document.addEventListener('keydown', onEscapePress);
  }

  function onUploadFileChange(evt) {
    evt.preventDefault();
    openFormEditPhoto();
  }

  uploadFile.addEventListener('change', onUploadFileChange);

  // Функция отправки AJAX-запроса
  function onFormSubmit(evt) {
    evt.preventDefault();
    function onSuccess() {
      window.messages.renderMessage();
      document.removeEventListener('keydown', onEscapePress);
      closeFormEditPhoto();
      setTimeout(function () {
        window.messages.renderSuccessMessage();
      }, TIMEOUT);
    }

    function onError() {
      window.messages.renderMessage();
      document.removeEventListener('keydown', onEscapePress);
      closeFormEditPhoto();
      window.messages.renderErrorMessage();
    }

    var formNew = new FormData(form);
    window.load.upload(formNew, onSuccess, onError);
  }

  window.form = {
    default: defaultStyle
  };

})();
