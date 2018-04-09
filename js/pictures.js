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
};
var randomCommentsIndex = [];

for (var j = 0; j < getRandomGap(1, 3); j++) {
  var randomComment = getRandomNumber(COMMENTS.length);
  randomCommentsIndex.push(randomComment);
}
var randomComments = [COMMENTS[randomCommentsIndex[0]], COMMENTS[randomCommentsIndex[1]]];
if (randomComments[1] === undefined) {
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
};

var renderPhotoCards = function (arr) {
  var photoTemplateNode = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesListNode = document.querySelector('.pictures');

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var photoElement = photoTemplateNode.cloneNode(true);
    photoElement.querySelector('.picture__img').src = arr[i].url;
    photoElement.querySelector('.picture__stat--comments').textContent = arr[i].comments.length;
    photoElement.querySelector('.picture__stat--likes').textContent = arr[i].likes;
    fragment.appendChild(photoElement);
  }
  picturesListNode.appendChild(fragment);
};

renderPhotoCards(photos);
