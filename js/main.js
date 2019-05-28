var usersComments = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

var usersNames = [
    "Артем",
    "Женя",
    "Иосиф",
    "Аня",
    "Дана",
    "Эдуард"
];

var descriptions = [
    "Тестим новую камеру!",
    "Затусили с друзьями на море",
    "Как же круто тут кормят",
    "Отдыхаем...",
    "Цените каждое мгновенье. Цените тех, кто с вами и отгоняйте все сомненья." +
    "Не обижайте всех словами.....",
    "Вот это тачка!"
];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var bigPictureBlock = document.querySelector('.big-picture');
var comments = bigPictureBlock.querySelector('.social__comments').children;

var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
};

var setData = function (comments, names) {
    var photos = [];
    var photo = {};

    for (var i = 0; i < 25; i++) {
        photo = {
            url: "photos/" + getRandomNumber(1, 25) + ".jpg",
            likes: getRandomNumber(15, 200),
            comments: [
                {
                    avatar: "img/avatar-" + getRandomNumber(1, 6) + ".svg",
                    message: comments[getRandomNumber(0, comments.length - 1)] + " " + comments[getRandomNumber(0, comments.length - 1)],
                    name: names[getRandomNumber(0, names.length - 1)]
                }
            ],
            description: descriptions[getRandomNumber(0, descriptions.length - 1)]
        }
        photos.push(photo);
    }
    return photos;
};

var data = setData(usersComments, usersNames);


var renderPictureMiniatures = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = 1;
    return pictureElement;
};

var pictureFragment = document.createDocumentFragment();
for (var i = 0; i < 25; i++) {
    pictureFragment.appendChild(renderPictureMiniatures(data[i]));
}

var pictureBlock = document.querySelector('.pictures');
pictureBlock.appendChild(pictureFragment);


var renderBigPicture = function () {
    bigPictureBlock.classList.remove('hidden');
    bigPictureBlock.querySelector('.big-picture__img').querySelector('img').setAttribute('src', data[0].url);
    bigPictureBlock.querySelector('.likes-count').textContent = data[0].likes;
    bigPictureBlock.querySelector('.comments-count').textContent = 1;
    return bigPictureBlock;
};

renderBigPicture();

var bigPictureRenderComments = function () {
    comments[0].querySelector('.social__text').textContent = data[0].comments[0].message;
    comments[0].querySelector('img').setAttribute('src', data[0].comments[0].avatar);
    comments[1].querySelector('.social__text').textContent = data[1].comments[0].message;
    comments[1].querySelector('img').setAttribute('src', data[1].comments[0].avatar);
    return comments;
};

bigPictureRenderComments();

var bigPictureRenderDescription = function () {
    bigPictureBlock.querySelector('.social__caption').textContent = data[0].description;
};

bigPictureRenderDescription();

var visuallyHiddenElements = function () {
    bigPictureBlock.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPictureBlock.querySelector('.comments-loader').classList.add('visually-hidden');
};

visuallyHiddenElements();
