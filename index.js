
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    // Function to take place whenever user clicks the AC button
    clear() {
        // Telling the currentOperand and previousOperand object 
        // to return an empty string and if the display is empty,
        // nothing will happen when the AC button is clicked
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    // Function to tale place whenever user clicks the Del button
    delete() {
        // The string value in current operand will be reduced by one whenever del button is clicked
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // We only want a single period to be added, therefore the if statement checks
        // for whether the number has any period, if it has, it will stop any addition of period
        if (number === '.' && this.currentOperand.includes('.')) return
        // The currentOperand will display concatenanted
        this.currentOperand += number
    }

    chooseOperation(operation) {
        // If the current operand is empty, do not execute the code outside of this if statement.
        if (this.currentOperand === '') return
        // If the previous operation is not empty and has a value, we want the to continue the computation,
        // and the rest of the code in this function
        if (this.previousOperand !== '') {
            this.compute()
        }
        //
        this.operation = operation
        // Gives the same value to the previous operand after we have type in the current operand.
        this.previousOperand = this.currentOperand
        // Clearing out the current operand, giving it an empty string
        this.currentOperand = ''
    }
    compute() {
        // Create a variable which wil be the result of the compute function 
        let computation
        // Create two more variables which will be converted to floating point numbers for 
        // mathematical operation to take place.
        // parseFloat takes the string value in the previous and current operand and convers them
        // to a floating point number.
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // Check swhether does the previous and current operand contain any number, if not, do not run the compute function.
        // isNan is short for "Not-a-Number".
        if (isNaN(prev) || isNaN(current)) return
        // If any of the 4 operators get clicked, do the computation in the switch statement
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        // Set the current operand as the result of the computation
        this.currentOperand = computation
        this.operation = undefined
        // When the results gets displayed in the current operand,
        // we want to clear out the previous operand to get ready for the next number,
        // which will then push the computed result into the previous operand when any operators are clicked.
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.textContent =
            this.getDisplayNumber(this.currentOperand)

        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// Assigning a variable according to the data-attribute in the html doc.

// Usage of querySelectorAll is chosen over getElementsByClassName because
// we can group the number buttons and operation buttons differently as they
// have different purposes.

const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-action]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// This calculator object is used to hookup the variables declared previously

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// Since querySelectorAll selects all data-number buttons and returns an array,
// loop through all of them to attach click event handlers one by one.
for (const button of numButtons)    //For every button of the numButtons array

    // Event handler to append number value to display box on click
    button.addEventListener('click', () => {
        // Whenever number buttons are click, execute the append number function
        // and then update the display accordingly
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })

// Since querySelectorAll selects all data-action buttons and returns an array,
// loop through all of them to attach click event handlers one by one.
for (const button of opButtons) // For every button of the opButtons array

    // Event handler to append operator value to display box on click
    button.addEventListener('click', () => {
        // Whenever number buttons are click, execute the choose operation function,
        // and then update the display accordingly
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
    })

// Event handler to clear all value to display box on click.
clearButton.addEventListener('click', () => {
    // Whenever the clear button is click, execute the clear function,
    // and then update the display accordingly.
    calculator.clear()
    calculator.updateDisplay()
})
// Event handler to delete one number value in display box on click.
deleteButton.addEventListener('click', () => {
    // Whenever number buttons are click, execute the delete function,
    // and then update the display accordingly
    calculator.delete()
    calculator.updateDisplay()
})

// Event handler to compute value in display box on click
equalsButton.addEventListener('click', () => {
    // Whenever number buttons are click, execute the compute function,
    // and then update the display accordingly.
    calculator.compute()
    calculator.updateDisplay()
})