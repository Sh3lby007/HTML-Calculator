// listen for all keypresses and determine the type of key that is pressed
//add event listener for any buttons clicked
// Whenever user clicks the number, it has to show on the calculator display
// 


// const numberButtons = document.querySelectorAll("[data-number]")
// const operationButtons = document.querySelectorAll("[data-action]")
// let display = document.querySelector(".box")


// numberButtons.addEventListener("button", showDisplay)

// function showDisplay() {
//     display.textContent = numberButtons

// }
// class calculator {
//     constructor(display) {
//         this.clear()
//     }

// }

// clear() {
//     this.display = " "

// }

// delete () {

// }



let display = document.getElementById('calculator_display')

const numberButtons = document.querySelectorAll('[data-number]')

const opButtons = document.querySelectorAll('[data-action]')

const equalsButton = document.querySelector('[data-equal]')

const deleteButton = document.querySelector('[data-delete]')

const clearButton = document.querySelector('[data-clear]')

const divide = document.getElementById('key--operator')

divide.addEventListener('click', showDisplay)

function showDisplay() {
    display.textContent = "÷"
    console.log(divide)
}