'use strict';

(function () {
  var MAX_COMMENT = 5;

  var Avatar = {
    WIDTH: 35,
    HEIGHT: 35
  };

  var comments = null;
  var renderedComments = 0;

  var body = document.querySelector('body');

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var commentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsButton = bigPicture.querySelector('.comments-loader');


  commentsCount.innerHTML = '';
  var currentCommentsCount = document.createElement('span');
  currentCommentsCount.classList.add('current-comments-count');
  commentsCount.appendChild(currentCommentsCount);
  commentsCount.appendChild(document.createTextNode(' из '));
  var maxCommentsCount = document.createElement('span');
  maxCommentsCount.classList.add('comments-count');
  commentsCount.appendChild(maxCommentsCount);
  commentsCount.appendChild(document.createTextNode(' комментариев'));

  function renderComment() {
    var length = +maxCommentsCount.textContent;
    var step = 1;
    var fragment = document.createDocumentFragment();
    for (; renderedComments <= length; renderedComments += 1) {
      currentCommentsCount.textContent = renderedComments;

      if (renderedComments === length) {
        commentsButton.classList.add('hidden');
        return;
      }
      if (comments[renderedComments]) {
        if (step > MAX_COMMENT) {
          break;
        }
        var comment = document.createElement('li');
        comment.classList.add('social__comment');

        var avatar = document.createElement('img');
        avatar.classList.add('social__picture');
        avatar.src = comments[renderedComments].avatar;
        avatar.alt = 'Аватар ' + comments[renderedComments].name;
        avatar.width = Avatar.WIDTH;
        avatar.height = Avatar.HEIGHT;

        var text = document.createElement('p');
        text.classList.add('social__text');
        text.textContent = comments[renderedComments].message;

        comment.appendChild(avatar);
        comment.appendChild(text);

        fragment.appendChild(comment);
        bigPictureSocialComments.appendChild(fragment);

        step += 1;

      }

    }

  }

  function onCommentsButtonClick(evt) {
    evt.preventDefault();
    renderComment();
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
    renderedComments = 0;
    bigPicture.classList.add('hidden');
    commentsButton.removeEventListener('click', onCommentsButtonClick);
    document.removeEventListener('keydown', onEscapePress);
    bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
    if (commentsButton.classList.contains('hidden')) {
      commentsButton.classList.remove('hidden');
    }
  }

  window.preview = {
    show: function (image) {

      comments = image.comments;
      bigPictureSocialComments.innerHTML = '';

      bigPictureImg.src = image.url;
      bigPictureLikesCount.textContent = image.likes;
      maxCommentsCount.textContent = image.comments.length;
      bigPictureSocialCaption.textContent = image.description;

      renderComment();

      body.classList.add('modal-open');

      // uploadFile.removeEventListener('change', onUploadFileChange);
      bigPicture.classList.remove('hidden');

      document.addEventListener('keydown', onEscapePress);
      bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
      commentsButton.addEventListener('click', onCommentsButtonClick);
    }
  };

})();
