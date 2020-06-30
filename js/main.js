'use strict';

(function () {
  /*
  var PICTURES_COUNT = 25;

  var Likes = {
    COUNT_MIN: 15,
    COUNT_MAX: 200
  };

  var Avatar = {
    COUNT_MIN: 1,
    COUNT_MAX: 6
  };

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
        avatar: 'img/avatar-' + getRandomNumber(Avatar.COUNT_MIN, Avatar.COUNT_MAX) + '.svg',
        message: getMessages(Avatar.COUNT_MIN, USERS_MESSAGES),
        name: NAMES[getRandomNumber(0, NAMES.length - 1)]
      };
      arrComments.push(objectComment);
    }
    return arrComments;
  }

  function createArrayOfPictures(count) {
    var arrPictures = [];
    for (var i = 1; i <= count; i += 1) {
      var pictureObject = {
        url: 'photos/' + i + '.jpg',
        description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
        likes: getRandomNumber(Likes.COUNT_MIN, Likes.COUNT_MAX),
        comments: createArrayOfComments(getRandomNumber(0, PICTURES_COUNT))
      };
      arrPictures.push(pictureObject);
    }
    return arrPictures;
  }
  */

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var picturesBlock = document.querySelector('.pictures');

  function renderPictures(arrObjects, container) {
    var fragment = document.createDocumentFragment();
    arrObjects.forEach(function (item) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = item.url;
      pictureElement.querySelector('.picture__comments').textContent = item.comments.length;
      pictureElement.querySelector('.picture__likes').textContent = item.likes;

      pictureElement.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.preview.show(item);
      });

      fragment.appendChild(pictureElement);
    });
    container.appendChild(fragment);
  }

  function onSuccess(pictures) {
    renderPictures(pictures, picturesBlock);
  }

  function onError(errorMessage) {
    var main = document.querySelector('main');
    var errorBlock = document.createElement('div');
    errorBlock.classList.add('error-block');
    errorBlock.textContent = errorMessage;
    main.insertAdjacentElement('afterbegin', errorBlock);
  }

  window.load.download(onSuccess, onError);
})();
