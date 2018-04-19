'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var pictureLinks = document.querySelectorAll('.picture__link');
  var bigPictureClose = bigPicture.querySelector('#picture-cancel');
  var commentsContainer = document.querySelector('.social__comments');
  var COUNT_COMMENTS = 2;

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  var renderComments = function (l, m) {
    var commentElement = document.createElement('li');
    commentElement.classList.add('social__comment', 'social__comment--text');

    var imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = 'img/avatar-' + window.util.isGetRandom(1, 6) + '.svg';
    imgElement.alt = 'Аватар комментатора фотографии';
    imgElement.width = '35';
    imgElement.height = '35';
    commentElement.appendChild(imgElement);
    var textElement = document.createTextNode(window.photos[m].comments[l]);
    commentElement.appendChild(textElement);
    return commentElement;
  };

  pictureLinks.forEach(function (picture, num) {
    picture.addEventListener('click', function () {
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
    });
  });

  var onBigPictureCloseClick = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  var onEscKeyPress = function (evt) {
    window.util.isEscEvent(evt, onBigPictureCloseClick);
  };

  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
})();
