'use strict';

(function () {

  var Avatar = {
    WIDTH: 35,
    HEIGHT: 35
  };

  var body = document.querySelector('body');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');


  function getBigPictureComments(blockComments, picture) {
    blockComments.innerHTML = '';

    picture.comments.forEach(function (item) {

      var comment = document.createElement('li');
      comment.classList.add('social__comment');

      var avatar = document.createElement('img');
      avatar.classList.add('social__picture');
      avatar.src = item.avatar;
      avatar.alt = 'Аватар ' + item.name;
      avatar.width = Avatar.WIDTH;
      avatar.height = Avatar.HEIGHT;

      var text = document.createElement('p');
      text.classList.add('social__text');
      text.textContent = item.message;

      comment.appendChild(avatar);
      comment.appendChild(text);

      blockComments.appendChild(comment);

    });
  }

  function onEscapePress(evt) {
    window.util.isEscapeEvent(evt, closeBigPicture);
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePress);
  }

  function onBigPictureCancelClick(evt) {
    evt.preventDefault();
    body.classList.remove('modal-open');
    closeBigPicture();
  }

  function closeBigPicture() {
    bigPicture.classList.add('hidden');
  }

  window.preview = {
    show: function (image) {
      bigPictureImg.src = image.url;
      bigPictureLikesCount.textContent = image.likes;
      bigPictureCommentsCount.textContent = image.comments.length;
      bigPictureSocialCaption.textContent = image.description;

      getBigPictureComments(bigPictureSocialComments, image);

      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');

      body.classList.add('modal-open');

      // uploadFile.removeEventListener('change', onUploadFileChange);
      bigPicture.classList.remove('hidden');

      document.addEventListener('keydown', onEscapePress);
      bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
    }
  };

})();
