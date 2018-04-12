'use strict';
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var ESC_KEYCODE = 27;
var DEFAULT_SCALE = 100;

var countPhotos = 25;
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomElenent = function (array) {
  return getRandomNumber(0, array.length);
};

var urlPhotos = [];
for (var i = 1; i <= countPhotos; i++) {
  urlPhotos.push('photos/' + i + '.jpg');
}
var sortRandom = function () {
  return Math.random() - 0.5;
};
urlPhotos.sort(sortRandom);

var generateComments = function (numberComments) {
  var comments = [];
  for (var j = 1; j <= numberComments; j++) {
    comments.push(COMMENTS[getRandomElenent(COMMENTS)]);
  }
  return comments;
};

var photos = [];
for (var k = 0; k < 25; k++) {
  var photoItem = {
    url: urlPhotos[k],
    likes: getRandomNumber(15, 200),
    comments: generateComments(getRandomNumber(1, 2)),
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
resizeControlValue.value = DEFAULT_SCALE;

var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onFormUploadHide();
  }
};

var imageScale = function () {
  var scale = resizeControlValue.value / 100;
  imageUploadPreview.style.transform = 'scale(' + scale + ')';
};
var onFormUploadShow = function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.addEventListener('keydown', onFormEscPress);
};
var onFormUploadHide = function () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.removeEventListener('keydown', onFormEscPress);
};
var onResizeControlMinusClick = function () {
  resizeControlValue.value = resizeControlValue.value - 25;
  imageScale();
};
var onResizeControlPlusClick = function () {
  resizeControlValue.value = parseInt(resizeControlValue.value, 10) + 25;
  imageScale();
};

inputPhotoUpload.addEventListener('change', onFormUploadShow);
inputPhotoClose.addEventListener('click', onFormUploadHide);
resizeControlMinus.addEventListener('click', onResizeControlMinusClick);
resizeControlPlus.addEventListener('click', onResizeControlPlusClick);

var photoEffectOrigiginal = document.getElementById('effect-none');
var photoEffectChrome = document.getElementById('effect-chrome');
var photoEffectSepia = document.getElementById('effect-sepia');
var photoEffectMarvin = document.getElementById('effect-marvin');
var photoEffectPhobos = document.getElementById('effect-phobos');
var photoEffectHeat = document.getElementById('effect-heat');

var onEffectOriginalClick = function () {
  imageUploadPreview.classList.remove('effects__preview--chrome');
  imageUploadPreview.classList.remove('effects__preview--sepia');
  imageUploadPreview.classList.remove('effects__preview--marvin');
  imageUploadPreview.classList.remove('effects__preview--phobos');
  imageUploadPreview.classList.remove('effects__preview--heat');
};
var onEffectChromeClick = function () {
  imageUploadPreview.classList.remove('effects__preview--sepia');
  imageUploadPreview.classList.remove('effects__preview--marvin');
  imageUploadPreview.classList.remove('effects__preview--phobos');
  imageUploadPreview.classList.remove('effects__preview--heat');
  imageUploadPreview.classList.add('effects__preview--chrome');
};
var onEffectSepiaClick = function () {
  imageUploadPreview.classList.remove('effects__preview--chrome');
  imageUploadPreview.classList.remove('effects__preview--marvin');
  imageUploadPreview.classList.remove('effects__preview--phobos');
  imageUploadPreview.classList.remove('effects__preview--heat');
  imageUploadPreview.classList.add('effects__preview--sepia');
};
var onEffectMarvinClick = function () {
  imageUploadPreview.classList.remove('effects__preview--chrome');
  imageUploadPreview.classList.remove('effects__preview--sepia');
  imageUploadPreview.classList.remove('effects__preview--phobos');
  imageUploadPreview.classList.remove('effects__preview--heat');
  imageUploadPreview.classList.add('effects__preview--marvin');
};
var onEffectPhobosClick = function () {
  imageUploadPreview.classList.remove('effects__preview--chrome');
  imageUploadPreview.classList.remove('effects__preview--sepia');
  imageUploadPreview.classList.remove('effects__preview--marvin');
  imageUploadPreview.classList.remove('effects__preview--heat');
  imageUploadPreview.classList.add('effects__preview--phobos');
};
var onEffectHeatClick = function () {
  imageUploadPreview.classList.remove('effects__preview--chrome');
  imageUploadPreview.classList.remove('effects__preview--sepia');
  imageUploadPreview.classList.remove('effects__preview--marvin');
  imageUploadPreview.classList.remove('effects__preview--phobos');
  imageUploadPreview.classList.add('effects__preview--heat');
};

photoEffectChrome.addEventListener('click', onEffectChromeClick);
photoEffectOrigiginal.addEventListener('click', onEffectOriginalClick);
photoEffectSepia.addEventListener('click', onEffectSepiaClick);
photoEffectMarvin.addEventListener('click', onEffectMarvinClick);
photoEffectPhobos.addEventListener('click', onEffectPhobosClick);
photoEffectHeat.addEventListener('click', onEffectHeatClick);

renderPhotoCards(photos);
//showBigPicture(photos[0]);
