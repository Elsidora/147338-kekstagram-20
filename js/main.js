'use strict';
var COUNT_PICTURES = 25;

var LIKES_MIN = 15;

var LIKES_MAX = 200;

var AVATAR_MIN = 1;

var AVATAR_MAX = 6;

var DESCRIPTIONS = [
  'Люблю отдыхать!',
  'Море, море, мир бездонный',
  'Прекрасное далеко, не будь ко мне жестоко',
  'До чего дошел прогресс!',
  'У каждого человека внутри существует предел...',
  'Упущенное время не вернуть. Но кто сказал вам, что оно пропало даром!'
];

var USERS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = ['Богдан', 'Лукерья', 'Изяслав', 'Акулина', 'Елисей', 'Ефимия'];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var picturesBlock = document.querySelector('.pictures');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getMessages(count, array) {
  var messages = [];
  for (var i = 0; i < count; i += 1) {
    var firstMessage = array[getRandomNumber(0, array.length - 1)];
    var secondMessage = array[getRandomNumber(0, array.length - 1)];
    var listMessage = firstMessage + ' ' + secondMessage;

    if (firstMessage === secondMessage) {
      listMessage = firstMessage;
    }
    messages.push(listMessage);
  }
  return messages;
}

function createArrayOfComments(count) {
  var arrComments = [];
  for (var i = 0; i < count; i += 1) {
    var objectComment = {
      avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: getMessages(AVATAR_MIN, USERS_MESSAGES),
      name: NAMES[getRandomNumber(0, NAMES.length - 1)]
    };
    arrComments.push(objectComment);
  }
  return arrComments;
}

function createArrayOfPictures(count) {
  var arrPictures = [];
  for (var i = 0; i < count; i += 1) {
    var pictureObject = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: createArrayOfComments(getRandomNumber(0, COUNT_PICTURES))
    };
    arrPictures.push(pictureObject);
  }
  return arrPictures;
}

function renderPictures(arrObjects, container) {
  var fragment = document.createDocumentFragment();
  arrObjects.forEach(function (item) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = item.url;
    pictureElement.querySelector('.picture__comments').textContent = item.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = item.likes;
    fragment.appendChild(pictureElement);
  });
  container.appendChild(fragment);
}

// module3-task3

var AVATAR_WIDTH = 35;
var AVATAR_HEIGHT = 35;
var body = document.querySelector('body');

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');

function getBigPictureComments(blockComments, picture) {
  blockComments.innerHTML = '';

  picture.comments.forEach(function (item) {

    var comment = document.createElement('li');
    comment.classList.add('social__comment');

    var avatar = document.createElement('img');
    avatar.classList.add('social__picture');
    avatar.src = item.avatar;
    avatar.alt = 'Аватар ' + item.name;
    avatar.width = AVATAR_WIDTH;
    avatar.height = AVATAR_HEIGHT;

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = item.message;

    comment.appendChild(avatar);
    comment.appendChild(text);

    blockComments.appendChild(comment);

  });
}

function showBigPicture(image) {

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

// module4-task2

var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

var form = picturesBlock.querySelector('.img-upload__form');
var uploadFile = form.querySelector('#upload-file');
var imgUploadOverlay = form.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

function onBigPictureCancelClick(evt) {
  evt.preventDefault();
  body.classList.remove('modal-open');
  closeBigPicture();
}

function onEscapePress(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (!bigPicture.classList.contains('hidden')) {
      closeBigPicture();
    } else if (!imgUploadOverlay.classList.contains('hidden')) {
      closeFormEditPhoto();
    }
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePress);
  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
}

function onUploadFileChange(evt) {
  evt.preventDefault();
  openFormEditPhoto();
}

function openFormEditPhoto() {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscapePress);

  body.classList.add('modal-open');
  imgUploadCancel.addEventListener('click', onImgUploadCancelClick);
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

uploadFile.addEventListener('change', onUploadFileChange);

// Хэштеги

var hashtags = form.querySelector('.text__hashtags');

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
    if (!arrayOfHashtags[i].match("^#[A-Za-z0-9]+$")) {
      hashtags.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т.д.');
      break;
    }
    hashtags.setCustomValidity('');

  }
  //hashtags.setCustomValidity('');
}

hashtags.addEventListener('input', onValidateHashtags);

function onHashtagsFocus(evt) {
  evt.preventDefault();
  document.removeEventListener('keydown', onEscapePress);
}
hashtags.addEventListener('focus', onHashtagsFocus);

function onHashtagsBlur(evt) {
  evt.preventDefault();
  document.addEventListener('keydown', onEscapePress);
}
hashtags.addEventListener('blur', onHashtagsBlur);


showBigPicture(createArrayOfPictures(COUNT_PICTURES)[0]);
renderPictures(createArrayOfPictures(COUNT_PICTURES), picturesBlock);
