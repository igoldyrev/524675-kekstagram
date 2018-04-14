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

var picturesList = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var j = 0; j < countPhotos; j++) {
  fragment.appendChild(renderPhoto(photos[j]));
}
picturesList.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
var pictureLinks = document.querySelectorAll('.picture__link');
var bigPictureClose = bigPicture.querySelector('#picture-cancel');
var commentsContainer = document.querySelector('.social__comments');

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

var renderComments = function (l, m) {
  var commentElement = document.createElement('li');
  commentElement.classList.add('social__comment', 'social__comment--text');

  var imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  imgElement.alt = 'Аватар комментатора фотографии';
  imgElement.width = '35';
  imgElement.height = '35';
  commentElement.appendChild(imgElement);
  var textElement = document.createTextNode(photos[m].comments[l]);
  commentElement.appendChild(textElement);
  return commentElement;
};

pictureLinks.forEach(function (picture, num) {
  picture.addEventListener('click', function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onEscKeyPress);

    bigPicture.querySelector('.big-picture__img img').src = photos[num].url;
    bigPicture.querySelector('.social__caption').textContent = photos[num].description;
    bigPicture.querySelector('.likes-count').textContent = photos[num].likes;
    bigPicture.querySelector('.comments-count').textContent = photos[num].comments.length;

    for (var m = commentsContainer.children.length; m > 0; m--) {
      commentsContainer.innerHTML = '';
    }

    for (var k = 0; (k < photos[num].comments.length) && (k < 2); k++) {
      commentsContainer.appendChild(renderComments(k, num));
    }
  });
});

var onBigPictureCloseClick = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

var onEscKeyPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onBigPictureCloseClick();
    onUploadCancelClick();
  }
};

bigPictureClose.addEventListener('click', onBigPictureCloseClick);

var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var imageUploadElement = document.querySelector('.img-upload__overlay');
var imageUploadEffects = imageUploadElement.querySelector('.effects__list');
var imageUploadImg = imageUploadElement.querySelector('.img-upload__preview img');
var imageSlider = imageUploadElement.querySelector('.img-upload__scale');

var onUploadFileClick = function () {
  imageUploadElement.classList.remove('hidden');
  resizeControlValue.value = '100%';
  imageSlider.classList.add('hidden');
  scalePin.style.left = '100%';
  scaleLevel.style.width = '100%';
  document.addEventListener('keydown', onEscKeyPress);
};

var onUploadCancelClick = function () {
  imageUploadElement.classList.add('hidden');
  uploadFile.value = '';
};

uploadFile.addEventListener('change', onUploadFileClick);
uploadCancel.addEventListener('click', onUploadCancelClick);

var onEffectsRadioClick = function (evt) {
  var setEffect = function (eff) {
    imageUploadImg.className = '';
    var effect = 'effects__preview--' + eff;
    imageUploadImg.classList.add(effect);
    imageSlider.classList.remove('hidden');
    resizeControl.style.zIndex = 1;
  };

  var effectId = evt.target.id.replace('effect-', '');
  if (effectId === 'none') {
    imageUploadImg.removeAttribute('class');
    imageSlider.classList.add('hidden');
  } else {
    setEffect(effectId);
  }
};

imageUploadEffects.addEventListener('click', onEffectsRadioClick);

var resizeControl = imageUploadElement.querySelector('.resize');
var resizeControlMinus = imageUploadElement.querySelector('.resize__control--minus');
var resizeControlValue = imageUploadElement.querySelector('.resize__control--value');
var resizeControlPlus = imageUploadElement.querySelector('.resize__control--plus');

var resizeImg = function (evt) {
  var scale;
  var currentValue = Number.parseInt(resizeControlValue.value, 10);

  if (evt.target === resizeControlMinus) {
    if (currentValue > 25) {
      currentValue -= 25;
    }
  } else if (evt.target === resizeControlPlus) {
    if (currentValue < 100) {
      currentValue += 25;
    }
  }

  scale = 'scale(0.' + currentValue + ')';

  resizeControlValue.value = (currentValue + '%');
  imageUploadImg.style.transform = scale;

  if (currentValue === 100) {
    imageUploadImg.removeAttribute('style');
  }
};

resizeControlMinus.addEventListener('click', resizeImg);
resizeControlPlus.addEventListener('click', resizeImg);

var scalePin = imageUploadElement.querySelector('.scale__pin');
var scaleLevel = imageUploadElement.querySelector('.scale__level');
