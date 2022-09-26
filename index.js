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

const numButtons = document.querySelectorAll('[data-number]')

const opButtons = document.querySelectorAll('[data-action]')

const equalsButton = document.querySelector('[data-equal]')

const deleteButton = document.querySelector('[data-delete]')

const clearButton = document.querySelector('[data-clear]')

// For every button of the numButtons array, do XXX
// 
// Since query selector selects all data-number buttons and returns an array,
// loop through all of them to attach click event handlers one by one.
for (const button of numButtons)
    // Event handler to append number value to display box on click
    button.addEventListener('click', (event) =>
        // display.textContent += event.target.attributes['data-number'].value
        // https://javascript.plainenglish.io/how-to-get-and-set-the-value-of-a-data-attribute-with-javascript-f0a1bd44063d
        display.textContent += event.target.dataset.number
    )
for (const button of opButtons)

    button.addEventListener('click', (event) =>
        display.textContent += event.target.attributes['data-action'].value
    )


clearButton.addEventListener('click', clear)

function clear() {
    display.textContent = " "
}

deleteButton.addEventListener('click', del)

function del() {
    display.textContent = display.textContent.slice(0, - 1)
}



