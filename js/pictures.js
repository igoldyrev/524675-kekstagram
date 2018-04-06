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
var randomLikes = getRandomGap(15, 200);
var randomDescription = getRandomNumber(DESCRIPTIONS.length);
var randomComments = [];

for (var j = 0; j < 2; j++) {
  var randomComment = getRandomNumber(COMMENTS.length);
  randomComments.push(randomComment);
}
