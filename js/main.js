'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var picturesBlock = document.querySelector('.pictures');

  var imgFilters = document.querySelector('.img-filters');

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

  // Функция создания копии массива фотографий с сервера
  function getDefaultPictures(pictures) {
    return pictures.slice();
  }

  // Функция нахождения 10 случайных неповторяющихся фотографий
  function getRandomPictures(pictures) {
    var randomUniqueArray = window.util.getUniqueArray(0, pictures.length);
    var randomPictures = [];
    randomUniqueArray.forEach(function (item) {
      return randomPictures.push(pictures[item]);
    });
    return randomPictures;
  }

  // Функция нахождения самых обсуждаемых фотографий (сортировка)
  function getDiscussionPictures(pictures) {
    var sortCommentPictures = pictures.slice();
    sortCommentPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return sortCommentPictures;
  }

  // Функция обработки кликов по кнопкам-фильтрам
  function clickFilterButton(photos) {
    var buttons = imgFilters.querySelectorAll('button');
    var sortPictures = [];

    var onButtonDefaultClick = window.debounce.debounce(function (evt) {
      onButtonClick(getDefaultPictures, evt);
    });

    var onButtonRandomClick = window.debounce.debounce(function (evt) {
      onButtonClick(getRandomPictures, evt);
    });

    var onButtonDiscussionClick = window.debounce.debounce(function (evt) {
      onButtonClick(getDiscussionPictures, evt);
    });

    function onButtonClick(callback, evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target.type === 'button') {
        var activeButton = imgFilters.querySelector('.img-filters__button--active');
        activeButton.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
        window.util.clearGallery('.picture', picturesBlock);
        sortPictures = callback(photos);
        renderPictures(sortPictures, picturesBlock);

      }
    }

    function addEventElement(element, elementId, elementFunction) {
      if (element.id === elementId) {
        element.addEventListener('click', elementFunction);
      }
    }

    buttons.forEach(function (item) {
      addEventElement(item, 'filter-default', onButtonDefaultClick);
      addEventElement(item, 'filter-random', onButtonRandomClick);
      addEventElement(item, 'filter-discussed', onButtonDiscussionClick);

    });
  }

  function onSuccess(pictures) {
    renderPictures(pictures, picturesBlock);
    imgFilters.classList.remove('img-filters--inactive');
    clickFilterButton(pictures);
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
