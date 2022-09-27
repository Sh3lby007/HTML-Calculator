// listen for all keypresses and determine the type of key that is pressed
//add event listener for any buttons clicked
// Whenever user clicks the number, it has to show on the calculator display
// 
const numButtons = document.querySelectorAll('[data-number]')

const opButtons = document.querySelectorAll('[data-action]')

const equalsButton = document.querySelector('[data-equal]')

const deleteButton = document.querySelector('[data-delete]')

const clearButton = document.querySelector('[data-clear]')

const prev = document.querySelector('[data-previous-operand]')

const current = document.querySelector('[data-current-operand]')

// For every button of the numButtons array, do XXX
// 
// Since query selector selects all data-number buttons and returns an array,
// loop through all of them to attach click event handlers one by one.
for (const button of numButtons)
    // Event handler to append number value to display box on click
    button.addEventListener('click', (e) => {
        // https://javascript.plainenglish.io/how-to-get-and-set-the-value-of-a-data-attribute-with-javascript-f0a1bd44063d
        prev.textContent += e.target.dataset.number
        current.textContent += e.target.dataset.number
    })


// For every button of the opButtons array, do XXX
for (const button of opButtons)

    button.addEventListener('click', (event) => {
        prev.textContent += event.target.attributes['data-action'].value
    })


clearButton.addEventListener('click', clear)

function clear() {
    prev.textContent = " "
    current.textContent = " "
}

deleteButton.addEventListener('click', del)

function del() {
    prev.textContent = current.textContent.slice(0, -1)
    current.textContent = current.textContent.slice(0, -1)
}

equalsButton.addEventListener('click', (event) => {

    const prev = parseFloat(this.previousOperandTextElement)
    const current = parseFloat(this.currentOperandTextElement)
    if (isNaN(prev) || isNaN(current)) return
    switch (event.target.textContent) {
        case '+':
            display.textContent = prev + current
            break
        case '-':
            display.textContent = prev - current
            break
        case '*':
            display.textContent = prev * current
            break
        case '÷':
            display.textContent = prev / current
            break
        default:
            return
    }
})
