'use strict';
// Global Variables
var arrayOfProduct = [];
var arrayOfImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var leftProductImg = document.getElementById('left_product_img');
var centerProductImg = document.getElementById('center_product_img');
var rightProductImg = document.getElementById('right_product_img');
var leftProductText = document.getElementById('left_product_h2');
var centerProductText = document.getElementById('center_product_h2');
var rightProductText = document.getElementById('right_product_h2');
var clicksLeft = 25;
var productCanvas = document.getElementById('productChart').getContext('2d');
var productCanvas2 = document.getElementById('productChart2').getContext('2d');

var shownImages = []; // this array will be responsible  for keeping track of the shown img at the current loop

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
//function that ensure the images currently displayed are not the same as the next images to be displayed
function checkAvailability(selectProductName) {
    for (let index = 0; index < shownImages.length; index++) {

        if (shownImages[index].name === selectProductName) {
            return true; // because I want it to keep generating images as long as the previous one = the current one
        }

    }
    return false; // so it breaks out the do-while loop because they are not the same.
}
//function for choosing 3 random images
function pickImage() {
    do {
        var leftImg = Math.round(Math.random() * (arrayOfProduct.length - 1));
        var leftImageName = arrayOfProduct[leftImg].productName;
    } while (checkAvailability(leftImageName));


    do {
        var centerImg = Math.round(Math.random() * (arrayOfProduct.length - 1));
        var centerImageName = arrayOfProduct[centerImg].productName;
    } while (leftImg === centerImg || checkAvailability(centerImageName));


    do {
        var rightImg = Math.round(Math.random() * (arrayOfProduct.length - 1));
        var rightImageName = arrayOfProduct[rightImg].productName;
    } while (rightImg === centerImg || rightImg === leftImg || checkAvailability(rightImageName));

    //here I will be pushing the generated images to the array shownImages.
    //this step is to keep track of al the images shown right now
    shownImages = []; //to clear the array after each display
    shownImages.push(arrayOfProduct[leftImg], arrayOfProduct[centerImg], arrayOfProduct[rightImg]);


    renderImg(leftImg, centerImg, rightImg);
}

// function for rendering the images on the front page
function renderImg(leftImg, centerImg, rightImg) {
    leftProductImg.setAttribute('src', arrayOfProduct[leftImg].imgFilePath);
    centerProductImg.setAttribute('src', arrayOfProduct[centerImg].imgFilePath);
    rightProductImg.setAttribute('src', arrayOfProduct[rightImg].imgFilePath);

    leftProductText.textContent = arrayOfProduct[leftImg].productName;
    centerProductText.textContent = arrayOfProduct[centerImg].productName;
    rightProductText.textContent = arrayOfProduct[rightImg].productName;

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

//function that keeps tracks of clicks
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


//function that compare the image clicked with the path in the objects
function checkProduct(objectIndicator) {
    for (var index = 0; index < arrayOfProduct.length; index++) {
        if (arrayOfProduct[index].imgFilePath === objectIndicator) {
            arrayOfProduct[index].timesClicked++;
            clicksLeft--;
        }
    }

    console.log("You have " + clicksLeft + " Clicks left");
    if (clicksLeft === 0) {
        renderChart();
        renderChart2();
        createButton();
    }
}

// function for result report:
function createButton() {

    var button = document.createElement("button")
    button.innerHTML = "Result";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);
    button.addEventListener("click", addResultList)


}

//function for adding the list:
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

function renderChart() {

    var arrayOfImagesNames = [];
    var arrayOfImagesClicked = [];
    var arrayOfImagesShown = [];


    for (var index = 0; index < arrayOfProduct.length; index++) {
        arrayOfImagesNames.push(arrayOfProduct[index].productName);
        arrayOfImagesClicked.push(arrayOfProduct[index].timesClicked);
        arrayOfImagesShown.push(arrayOfProduct[index].timesShown);

    }

    var myChart = new Chart(productCanvas, {
        type: 'bar',// define the type of the chart
        data: {
            labels: arrayOfImagesNames, // array of labels (names of the products)
            datasets: [
                {
                    label: '# of Products Clicks',
                    data: arrayOfImagesClicked, // array of values (count for each image when it was clicked)
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                },
                {
                    label: 'Number of Time Shown',
                    data: arrayOfImagesShown, // array of values (count for each goat when it was clicked)
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderWidth: 1
                }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

//=======================
// onother chart


function renderChart2() {

    var arrayOfImagesNames = [];
    var arrayOfImagesClicked = [];
    var arrayOfImagesShown = [];


    for (var index = 0; index < arrayOfProduct.length; index++) {
        arrayOfImagesNames.push(arrayOfProduct[index].productName);
        arrayOfImagesClicked.push(arrayOfProduct[index].timesClicked);
        arrayOfImagesShown.push(arrayOfProduct[index].timesShown);

    }



    var mixedChart = new Chart(productCanvas2, {
        type: 'bar',
        data: {
            datasets: [{
                label: '# of Shown Images',
                data: arrayOfImagesShown,
            }, {
                label: '# of Selected Images',
                data: arrayOfImagesClicked,
                backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                ],

                // Changes this dataset to become a line
                type: 'line'
            }],
            labels: arrayOfImagesNames,
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}