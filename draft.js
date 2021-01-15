if (numberOfRounds === 25) {
    parentElement.removeEventListener("click", userChoice)
    var resultsButton = document.createElement("button");
    parentElement.appendChild(resultsButton);
    resultsButton.textContent = "View Results";
    resultsButton.addEventListener("click", printOut)
}
renderImages();


function printOut() {

for (var index = 0; index < arrayOfProducts.length; index++) {
    resultEntry[index] = document.createElement("p");
    resultEntry[index].textContent = arrayOfProducts[index].name + " had " + arrayOfProducts[index].timesPicked + " votes, and was seen" + arrayOfProducts[index].timeShown + " times.";
    resultsSection.appendChild(resultEntry[index]);

}


}