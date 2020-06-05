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

function getArrComments(count) {
  var arrComments = [];
  for (var i = 0; i < count; i += 1) {
    var objectComment = {
      avatar: 'img/avatar-' + getRandomNumber(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: getMessages(getRandomNumber(0, USERS_MESSAGES.length - 1), USERS_MESSAGES),
      name: NAMES[getRandomNumber(0, NAMES.length - 1)]
    };
    arrComments.push(objectComment);
  }
  return arrComments;
}

function getArrPictures(count) {
  var arrPictures = [];
  for (var i = 0; i < count; i += 1) {
    var pictureObject = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: getArrComments(getRandomNumber(0, COUNT_PICTURES))
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

renderPictures(getArrPictures(COUNT_PICTURES), picturesBlock);
