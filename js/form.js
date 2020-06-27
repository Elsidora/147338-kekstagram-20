'use strict';

(function () {

  var body = document.querySelector('body');
  var form = body.querySelector('.img-upload__form');
  var uploadFile = form.querySelector('#upload-file');
  var imgUploadOverlay = form.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var hashtags = imgUploadOverlay.querySelector('.text__hashtags');
  var textDescription = imgUploadOverlay.querySelector('.text__description');
  var imgUploadEffects = imgUploadOverlay.querySelector('.img-upload__effects');
  var scaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');

  function onEscapePress(evt) {
    window.util.isEscapeEvent(evt, closeFormEditPhoto);
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePress);
  }

  function openFormEditPhoto() {
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscapePress);

    body.classList.add('modal-open');
    imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
    scaleSmaller.addEventListener('click', window.size.minusClick);
    scaleBigger.addEventListener('click', window.size.plusClick);
    imgUploadEffects.addEventListener('click', window.effects.radioClick);
    effectLevelPin.addEventListener('mousedown', window.effects.movePin);
    hashtags.addEventListener('input', window.hashtags.validate);

    hashtags.addEventListener('focus', onHashtagsFocus);
    hashtags.addEventListener('blur', onHashtagsBlur);
    textDescription.addEventListener('focus', onTextDescriptionFocus);
    textDescription.addEventListener('blur', onTextDescriptionBlur);
    // uploadFile.removeEventListener('change', onUploadFileChange);
    uploadFile.blur();
  }

  function closeFormEditPhoto() {
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    // form.reset();
  }

  function onImgUploadCancelClick(evt) {
    evt.preventDefault();
    closeFormEditPhoto();
    body.classList.remove('modal-open');
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

})();
