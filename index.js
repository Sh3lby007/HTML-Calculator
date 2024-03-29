class Calculator {
    /* Declare all instance variables/properties first */
    expressionData = ""
    resultData = ""
    historyData = []

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // Method to take place whenever user clicks the AC button.
    clear() {
        // Telling the currentOperand and previousOperand object to return an empty string and if the display is empty, nothing will happen when the AC button is clicked.
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // Method to take place whenever user clicks the Del button.
    delete() {
        // The string value in current operand will be reduced by one whenever del button is clicked
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    // Method to take place whenever user clicks any numButtons
    appendNumber(number) {
        // We only want a single period to be added, therefore the if statement checks for whether the number has any period, if it has, it will stop any addition of period.
        if (number === '.' && this.currentOperand.includes('.')) return
        // The currentOperand will display concatenanted numbers.
        this.currentOperand += number
    }
    // Method to take place whenever user clicks any opButtons.
    chooseOperation(operation) {
        // If the current operand is empty, do not execute the code outside of this if statement.
        if (this.currentOperand === '') return
        // If the previous operation is not empty and has a value, we want the to continue the computation,and the rest of the code in this method.
        if (this.previousOperand !== '') {
            this.compute()
        }
        // Declaring the operation paramter to become a class scope property
        this.operation = operation
        // Gives the same value to the previous operand after we have type in the current operand.
        this.previousOperand = this.currentOperand
        // Clearing out the current operand, giving it an empty string for new number to be inputed.
        this.currentOperand = ''

    }
    // Method to take place whenever equals button gets clicked 
    compute() {
        // Create a variable which wil be the result of the compute method 
        let computation
        // Create two more variables which will be converted to floating point numbers for mathematical operation to take place.
        // ParseFloat takes the string value in the previous and current operand and converts them to a floating point number.
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // Check swhether does the previous and current operand contain any number, if not, do not run the compute method.
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
        // When the results gets displayed in the current operand, we want to clear out the previous operand to get ready for the next number, which will then push the computed result into the previous operand when any operators are clicked.
        this.previousOperand = ''
        // Give the expressionData the whole string of calculation 
        this.expressionData = `${prev} ${this.operation} ${current}`
        // Give the resultData the result of the computation
        this.resultData = computation
        // Only reset the operation after creating the `this.expressionData`
        this.operation = undefined
    }

    // Method for the current and previous operand to display commas 
    getDisplayNumber(number) {
        // Giving the number inputed a variable called string number and convert it to a string as it will be required to split the string before and after the period symbol to differentiate integer and decimals.
        const stringNumber = number.toString() // 
        // Convert the integer numbers from a string to an array.
        const integerNumber = parseFloat(stringNumber.split('.')[0]) // Before period.
        // // Convert the decimal numbers from a string to an array 
        const decimalNumnber = stringNumber.split('.')[1] // After period.
        let integerDisplay

        if (isNaN(integerNumber)) {
            integerDisplay = ''
        } else {
            // “toLocaleString()” is a method that returns a string with a language sensitive representation of number or date. In this case, this method automatically formats the number with commas.
            // Wheras "maximumFractionDigits" is an option used with "toLocaleString" to limit any decimal places after the whole number.
            integerDisplay = integerNumber.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalNumnber != null) {
            return `${integerDisplay}.${decimalNumnber} `
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {

        this.currentOperandTextElement.textContent =
            this.getDisplayNumber(this.currentOperand)
        // If the computed result is not equals to a null value, we want to display the pereviousOperandTextElement which is a concatenation of the previous operand and the operator.
        if (this.operation != null) {
            this.previousOperandTextElement.textContent =
                // Backticks are an ES6 feature to create strings in JS.
                // This string is to show the previous number and operator in the previous operand div, which will enhance user experience and visibility
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation} `
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    displayHistory() {
        let calc_history_string = ''
        // Add a new calculation entry to the start of the history array
        this.historyData.unshift({ "expression": this.expressionData, "result": this.resultData })
        // Check whether the current operand has any value, if it does not, we dont wan't the array to be added
        if (this.currentOperand === '' || this.expressionData === '')
            this.historyData.shift()

        for (var key in this.historyData) {
            calc_history_string += this.historyData[key]['expression'] + '=' + this.historyData[key]['result'] + "<br>"
        }
        history.innerHTML = calc_history_string
        console.log(this.historyData)
    }

}

// Assigning a variable according to the data-attribute in the html doc.

// Usage of querySelectorAll is chosen over getElementsByClassName because we can group the number buttons and operation buttons differently as they have different purposes.

const numButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-action]')
const equalsButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const history = document.getElementById("history_log")

// This calculator object is used to hookup the variables declared previously
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// Since querySelectorAll selects all data-number buttons and returns an array, loop through all of them to attach click event handlers one by one.
for (const button of numButtons)    //For every button of the numButtons array

    // Event handler to append number value to display box on click
    button.addEventListener('click', () => {
        // Whenever number buttons are click, execute the append number method
        // and then update the display accordingly
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })

// Since querySelectorAll selects all data-action buttons and returns an array,
// loop through all of them to attach click event handlers one by one.
for (const button of opButtons) // For every button of the opButtons array

    // Event handler to append operator value to display box on click
    button.addEventListener('click', () => {
        // Whenever number buttons are click, execute the choose operation method,
        // and then update the display accordingly
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
        calculator.displayHistory()
    })

// Event handler to clear all value to display box on click.
clearButton.addEventListener('click', () => {
    // Whenever the clear button is click, execute the clear method,
    // and then update the display accordingly.
    calculator.clear()
    calculator.updateDisplay()
})
// Event handler to delete one number value in display box on click.
deleteButton.addEventListener('click', () => {
    // Whenever number buttons are click, execute the delete method,
    // and then update the display accordingly
    calculator.delete()
    calculator.updateDisplay()
})

// Event handler to compute value in display box on click
equalsButton.addEventListener('click', () => {
    // Whenever number buttons are click, execute the compute method,
    // and then update the display accordingly.
    calculator.compute()
    calculator.updateDisplay()
    calculator.displayHistory()
    calculator.clear()
})