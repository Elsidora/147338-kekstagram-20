'use strict';
(function () {

  var INTERVAL = 5000;

  var form = document.querySelector('.img-upload__form');

  var main = document.querySelector('main');

  window.messages = {

    renderMessage: function () {

      var messageTemplate = document.querySelector('#messages').content.querySelector('div');

      var message = messageTemplate.cloneNode(true);

      window.messages.addMessage(message);

      setTimeout(function () {
        window.messages.deleteLoadMessage(message);
      }, INTERVAL);
    },

    deleteLoadMessage: function (message) {
      this.deleteMessage(message);
    },


    renderSuccessMessage: function () {

      var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

      var successMessage = successMessageTemplate.cloneNode(true);

      window.messages.addMessage(successMessage);

      var successButton = successMessage.querySelector('.success__button');

      // клик по кнопке button при сообщении об успешной загрузке
      function onSuccessButtonClick(evt) {
        evt.preventDefault();
        closeSuccessMessage();
      }

      // клик по ESC при сообщении об успешной загрузке
      function onEscapePress(evt) {
        window.util.isEscapeEvent(evt, closeSuccessMessage);
      }

      // клик по произвольной области экрана при сообщении об успешной загрузке
      function onDocumentSuccessClick(evt) {
        evt.preventDefault();
        closeSuccessMessage();
      }

      successButton.addEventListener('click', onSuccessButtonClick);
      document.addEventListener('keydown', onEscapePress);
      document.addEventListener('click', onDocumentSuccessClick);

      function closeSuccessMessage() {
        successButton.removeEventListener('click', onSuccessButtonClick);
        document.removeEventListener('keydown', onEscapePress);
        document.removeEventListener('click', onDocumentSuccessClick);
        window.messages.deleteSuccessMessage(successMessage);
        form.reset();
        window.form.default();
      }
    },

    deleteSuccessMessage: function (successMessage) {
      this.deleteMessage(successMessage);
    },

    // отрисовка сообщения об ошибке
    renderErrorMessage: function () {
      var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorMessage = errorMessageTemplate.cloneNode(true);
      window.messages.addMessage(errorMessage);

      var errorButton = errorMessage.querySelector('.error__button');

      // клик по кнопке сообщения об ошибке
      function onErrorButtonClick(evt) {
        evt.preventDefault();
        closeErrorMessage();
      }

      // клик по ESC при сообщении об ошибке
      function onEscapePress(evt) {
        window.util.isEscapeEvent(evt, closeErrorMessage);
      }

      // клик по произвольной области экрана при сообщении об ошибке
      function onDocumentErrorClick(evt) {
        evt.preventDefault();
        closeErrorMessage();
      }

      errorButton.addEventListener('click', onErrorButtonClick);
      document.addEventListener('keydown', onEscapePress);
      document.addEventListener('click', onDocumentErrorClick);

      function closeErrorMessage() {
        errorButton.removeEventListener('click', onErrorButtonClick);
        document.removeEventListener('keydown', onEscapePress);
        document.removeEventListener('click', onDocumentErrorClick);
        window.messages.deleteErrorMessage(errorMessage);
        form.reset();
        window.form.default();
      }
    },
    deleteErrorMessage: function (errorMessage) {
      this.deleteMessage(errorMessage);
    },

    // функция удаления блока с сообщением
    deleteMessage: function (blockMessage) {
      main.removeChild(blockMessage);
    },

    // функция добавления блока с сообщением
    addMessage: function (blockMessage) {
      main.appendChild(blockMessage);
    }
  };
})();
