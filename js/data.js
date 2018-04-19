'use strict';
(function () {
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  var countPhotos = 25;
  window.photos = [];
  var PhotoItem = function (n) {
    this.url = 'photos/' + (n + 1) + '.jpg';
    this.likes = window.common.isGetRandom(15, 200);
    this.comments = generateComments(window.common.isGetRandom(1, COMMENTS.length));
    this.description = DESCRIPTIONS[window.common.isGetRandom(0, DESCRIPTIONS.length)];
  };

  var generateComments = function (n) {
    var comments = [];
    var commentsCopy = COMMENTS.slice();
    for (var i = 0; i < n; i++) {
      var a = window.common.isGetRandom(0, commentsCopy.length);
      comments.push(commentsCopy[a]);
      commentsCopy.splice(a, 1);
    }
    return comments;
  };

  for (var i = 0; i < countPhotos; i++) {
    window.photos.push(new PhotoItem(i));
  }

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var renderPhoto = function (array) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = array.url;
    photoElement.querySelector('.picture__stat--comments').textContent = array.comments.length;
    photoElement.querySelector('.picture__stat--likes').textContent = array.likes;
    return photoElement;
  };

  var picturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < countPhotos; j++) {
    fragment.appendChild(renderPhoto(window.photos[j]));
  }
  picturesList.appendChild(fragment);
})();
