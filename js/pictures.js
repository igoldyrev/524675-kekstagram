'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var ESC_KEYCODE = 27;
var countPhotos = 25;

var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var photos = [];
var PhotoItem = function (n) {
  this.url = 'photos/' + (n + 1) + '.jpg';
  this.likes = getRandomNumber(15, 200);
  this.comments = generateComments(getRandomNumber(1, COMMENTS.length));
  this.description = DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length)];
};

var generateComments = function (n) {
  var comments = [];
  var commentsCopy = COMMENTS.slice();
  for (var i = 0; i < n; i++) {
    var a = getRandomNumber(0, commentsCopy.length);
    comments.push(commentsCopy[a]);
    commentsCopy.splice(a, 1);
  }
  return comments;
};

for (var i = 0; i < countPhotos; i++) {
  photos.push(new PhotoItem(i));
}

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var renderPhoto = function (array) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = array.url;
  photoElement.querySelector('.picture__stat--comments').textContent = array.comments.length;
  photoElement.querySelector('.picture__stat--likes').textContent = array.likes;
  return photoElement;
};

var renderPhotoCards = function () {
  var picturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < countPhotos; j++) {
    fragment.appendChild(renderPhoto(photos[j]));
  }
  picturesList.appendChild(fragment);
};

var bigPicture = document.querySelector('.big-picture');
var showBigPicture = function (arrElem) {
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

    commentUserPic.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    commentElem.appendChild(commentUserPic);
    commentElem.appendChild(textElem);
    fragment.appendChild(commentElem);
  }
  socialCommentsList.appendChild(fragment);
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
};

var inputPhotoUpload = document.getElementById('upload-file');
var inputPhotoClose = document.querySelector('.img-upload__cancel');
var resizeControlMinus = document.querySelector('.resize__control--minus');
var resizeControlPlus = document.querySelector('.resize__control--plus');
var resizeControlValue = document.querySelector('.resize__control--value');
var imageUploadPreview = document.querySelector('.img-upload__preview');

var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onFormUploadHide();
  }
};

var onFormUploadShow = function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);
};
var onFormUploadHide = function () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.removeEventListener('keydown', onFormEscPress);
};

resizeControlValue.value = 100 + '%';
resizeControlMinus.addEventListener('click', function () {
  if (parseInt(resizeControlValue.value, 10) >= 50) {
    resizeControlValue.value = parseInt(resizeControlValue.value, 10) - 25 + '%';
    imageUploadPreview.style.transform = 'scale(' + parseInt(resizeControlValue.value, 10) / 100 + ')';
  }
});

resizeControlPlus.addEventListener('click', function () {
  if (parseInt(resizeControlValue.value, 10) <= 75) {
    resizeControlValue.value = parseInt(resizeControlValue.value, 10) + 25 + '%';
    imageUploadPreview.style.transform = 'scale(' + parseInt(resizeControlValue.value, 10) / 100 + ')';
  } if (parseInt(resizeControlValue.value, 10) === 100) {
    imageUploadPreview.style.transform = '';
  }
});

inputPhotoUpload.addEventListener('change', onFormUploadShow);
inputPhotoClose.addEventListener('click', onFormUploadHide);

renderPhotoCards(photos);
//showBigPicture(photos[0]);
