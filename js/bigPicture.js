'use strict';
(function () {
  var COUNT_COMMENTS = 2;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('#picture-cancel');
  var commentsContainer = document.querySelector('.social__comments');

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  var renderComments = function (l, m) {
    var socialCaption = document.querySelector('.social__caption');
    var commentElement = document.createElement('li');
    commentElement.classList.add('social__comment', 'social__comment--text');

    var imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = 'img/avatar-' + window.common.isGetRandom(1, 6) + '.svg';
    imgElement.alt = 'Аватар комментатора фотографии';
    imgElement.width = '35';
    imgElement.height = '35';
    commentElement.appendChild(imgElement);
    var textElement = document.createTextNode(window.photos[m].comments[l]);
    commentElement.appendChild(textElement);
    socialCaption.textContent = window.photos[m].comments[1];
    return commentElement;
  };

  window.initBigPicture = function () {
    var pictureLinks = document.querySelectorAll('.picture__link');
    pictureLinks.forEach(function (picture, num) {
      var renderPhoto = function () {
        bigPicture.classList.remove('hidden');
        document.body.classList.add('modal-open');
        document.addEventListener('keydown', onEscKeyPress);

        bigPicture.querySelector('.big-picture__img img').src = window.photos[num].url;
        bigPicture.querySelector('.social__caption').textContent = window.photos[num].description;
        bigPicture.querySelector('.likes-count').textContent = window.photos[num].likes;
        bigPicture.querySelector('.comments-count').textContent = window.photos[num].comments.length;

        for (var m = commentsContainer.children.length; m > 0; m--) {
          commentsContainer.innerHTML = '';
        }

        for (var k = 0; (k < window.photos[num].comments.length) && (k < COUNT_COMMENTS); k++) {
          commentsContainer.appendChild(renderComments(k, num));
        }
      };
      picture.addEventListener('click', renderPhoto);
      picture.addEventListener('keydown', onEnterKeyPress);
    });
  };
  var onBigPictureCloseClick = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscKeyPress);
    document.removeEventListener('keydown', onEnterKeyPress);
  };

  var onEnterKeyPress = function (evt) {
    window.common.isEnterEvent(evt, window.initBigPicture);
  };

  var onEscKeyPress = function (evt) {
    window.common.isEscEvent(evt, onBigPictureCloseClick);
  };

  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
})();
