'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var countPhotos = 25;
var getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};
var getRandomGap = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var indexPhotos = [];
for (var i = 0; i < countPhotos; i++) {
  indexPhotos.push(getRandomNumber(countPhotos));
}
var randomCommentsIndex = [];

for (var j = 0; j < getRandomGap(1, 3); j++) {
  var randomComment = getRandomNumber(COMMENTS.length);
  randomCommentsIndex.push(randomComment);
}
var randomComments = [COMMENTS[randomCommentsIndex[0]], COMMENTS[randomCommentsIndex[1]]];
if (randomComments[1] === '') {
  randomComments.pop(randomComments[1]);
}

var photos = [];
for (var k = 0; k < 25; k++) {
  var photoItem = {
    url: 'photos/' + indexPhotos[k] + '.jpg',
    likes: getRandomGap(15, 200),
    comments: randomComments,
    description: DESCRIPTIONS[getRandomNumber(DESCRIPTIONS.length)],
  };
  photos.push(photoItem);
}

var renderPhotoCards = function (arr) {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesList = document.querySelector('.pictures');

  var fragment = document.createDocumentFragment();
  for (var l = 0; l < arr.length; l++) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = arr[l].url;
    photoElement.querySelector('.picture__stat--comments').textContent = arr[l].comments.length;
    photoElement.querySelector('.picture__stat--likes').textContent = arr[l].likes;
    fragment.appendChild(photoElement);
  }
  picturesList.appendChild(fragment);
};

var showBigPicture = function (arrElem) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img').src = arrElem.url;
  bigPicture.querySelector('.likes-count').textContent = arrElem.likes;
  bigPicture.querySelector('.comments-count').textContent = arrElem.comments.length;

  var fragment = document.createDocumentFragment();
  for (var m = 0; m < arrElem.comments.length; m++) {
    var socialCommentsList = document.querySelector('.social__comments');
    var commentElem = document.querySelector('.social__comment').cloneNode();
    var commentUserPic = document.querySelector('.social__picture').cloneNode(true);
    var textElem = document.createTextNode(arrElem.comments[m]);

    commentUserPic.src = 'img/avatar-' + getRandomGap(1, 6) + '.svg';
    commentElem.appendChild(commentUserPic);
    commentElem.appendChild(textElem);
    fragment.appendChild(commentElem);
  }
  socialCommentsList.appendChild(fragment);
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
};

renderPhotoCards(photos);
showBigPicture(photos[0]);
