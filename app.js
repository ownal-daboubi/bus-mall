'use strict';
// Global Variables
var arrayOfProduct = [];
var arrayOfImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
//console.log(arrayOfImages.length);
var leftProductImg = document.getElementById('left_product_img');
var centerProductImg = document.getElementById('center_product_img');
var rightProductImg = document.getElementById('right_product_img');
var leftProductText = document.getElementById('left_product_img');
var centerProductText = document.getElementById('center_product_img');
var rightProductText = document.getElementById('right_product_img');
var clicksLeft = 25;

//constractor
function Product(name) {
    this.productName = name.split(".")[0];
    this.imgFilePath = 'img/' + name;
    this.timesShown = 0;
    this.timesClicked = 0;
    arrayOfProduct.push(this);
}
// creating the objects
function generateObjects() {
    for (var i = 0; i < arrayOfImages.length; i++) {
        new Product(arrayOfImages[i]);
    }
}
generateObjects();

// Functions
//choosing 3 random images
function pickImage() {
    do {
        var leftImg = Math.round(Math.random() * (arrayOfProduct.length - 1));
        var centerImg = Math.round(Math.random() * (arrayOfProduct.length - 1));
        var rightImg = Math.round(Math.random() * (arrayOfProduct.length - 1));
    } while (leftImg === centerImg || leftImg === rightImg || centerImg === rightImg)
    renderImg(leftImg, centerImg, rightImg);
}
// rendering the images on the front page
function renderImg(leftImg, centerImg, rightImg) {
    leftProductImg.setAttribute('src', arrayOfProduct[leftImg].imgFilePath);
    centerProductImg.setAttribute('src', arrayOfProduct[centerImg].imgFilePath);
    rightProductImg.setAttribute('src', arrayOfProduct[rightImg].imgFilePath);

    leftProductText.textContent = arrayOfProduct[leftImg].name;
    centerProductText.textContent = arrayOfProduct[centerImg].name;
    rightProductText.textContent = arrayOfProduct[rightImg].name;

    arrayOfProduct[leftImg].timesShown++;
    arrayOfProduct[centerImg].timesShown++;
    arrayOfProduct[rightImg].timesShown++;

}
console.log(arrayOfProduct);
//Calling Funcrions
pickImage();



//adding a listner
var sectionId = document.getElementById('all_products');
sectionId.addEventListener('click', countClicks);

//keep tracks of clicks
function countClicks(event) {
    var targetId = event.target.id;
    if (clicksLeft !== 0) {
        if (targetId === 'left_product_img' || targetId === 'center_product_img' || targetId === 'right_product_img') {
            var objectIndicator = event.target.getAttribute('src');
            checkProduct(objectIndicator);
            pickImage();
        }
        else {
            sectionId.removeEventListener('click', countClicks);
        }
    }
}


//compare the image clicked with the path in the objects
function checkProduct(objectIndicator) {
    for (var index = 0; index < arrayOfProduct.length; index++) {
        if (arrayOfProduct[index].imgFilePath === objectIndicator) {
            arrayOfProduct[index].timesClicked++;
            clicksLeft--;
        }
    }
    
   console.log("You have " + clicksLeft + " Clicks left");
}

// result report:
//banana had 3 votes, and was seen 5 times.
function createButton() {
    if (true) {
        var button = document.createElement("button")
        button.innerHTML = "Result";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(button);
        button.addEventListener("click", addResultList)

    }
}
createButton();
//adding the list:
function addResultList() {
    var buttomSection = document.getElementById("buttom_section");
    var ul = document.createElement("ul");
    buttomSection.appendChild(ul);
    for (var i = 0; i < arrayOfProduct.length; i++) {
        var list = document.createElement("li");
        list.textContent = arrayOfProduct[i].productName + " had " + arrayOfProduct[i].timesClicked + " votes, and was seen  " + arrayOfProduct[i].timesShown + " times";
        ul.appendChild(list);
    }
}

// function informUser() {
//     var informUser = document.getElementById("timesleft");
//     var p = document.createElement("p");
//     informUser.appendChild(p);
//     p.textContent = "You have " + clicksLeft + " Clicks left";
// }

// informUser();