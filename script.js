const operatorButtons = document.getElementsByClassName('operator-button')
const numericButtons = document.getElementsByClassName('number-button')
const cleanAllButton = document.getElementById('clean-all')
const deleteButton = document.getElementById('delete')
const dotButton = document.getElementById('dot')
const inputValue = document.getElementById('display')
let currentNumber = ''
let previousNumber = ''
let operator = ''

// console.log(numericButtons)
// console.log(operatorButtons)


Array.from(numericButtons).forEach(button => {
    button.addEventListener('click', getInputeValue);
    // currentNumber = Number(currentNumber)
    // console.log(currentNumber, typeof currentNumber)
})

Array.from(operatorButtons).forEach(button => {
    button.addEventListener('click', getOperator)
})

function getInputeValue(event) {
    currentNumber += event.target.textContent
    // console.log(currentNumber)
    // console.log(previousNumber)
    updateDisplay()
}

function getOperator (event) {
    // console.log(operator)
    if (previousNumber === '') {
        previousNumber = Number(currentNumber)
        currentNumber = ''
    }
    else if (previousNumber !== '' && currentNumber !== '') {
        currentNumber = Number(currentNumber)
        previousNumber = operate(operator, currentNumber, previousNumber)
        currentNumber = ''
        operator = ''
    }
    operator = event.target.textContent
    // console.log(typeof previousNumber)
    checkDecimal()
    updateDisplay()
}

function checkDecimal() {
    previousNumber = previousNumber.toString()
    if (previousNumber.includes('.')) {
        let decimalNumber = previousNumber.split('.')
        // console.log(decimalNumber)
        decimalNumber = decimalNumber[1].length
        if (decimalNumber > 5) {
            return previousNumber = Number(previousNumber).toFixed(5)
        }
    }
 }

function updateDisplay() {
    if (previousNumber === 'You shall not pass!') {
        inputValue.value = previousNumber
        previousNumber = ''
    }
    else if (previousNumber !== '' && operator !== '' && currentNumber !== '') {
        inputValue.value = `${previousNumber} ${operator} ${currentNumber}`
    } 
    else if (previousNumber !== '' && operator !== '' && operator !== '=' && currentNumber === '') {
        inputValue.value = `${previousNumber} ${operator}`
    } 
    else if (previousNumber !== '' && (operator === '' || operator === '=')) {
        inputValue.value = previousNumber
        // console.log(typeof previousNumber)
    }
    else  {
        inputValue.value = currentNumber;
    }
}


function operate(operator, currentNumber, previousNumber) {
    switch(operator) {
        case '+': 
            return Number(previousNumber) + currentNumber
        case '-':
            return previousNumber - currentNumber
        case '*': 
             return previousNumber * currentNumber
        case '/': 
             return currentNumber === 0 ? 'You shall not pass!' : previousNumber / currentNumber
        case '=':
            return previousNumber
        default:
            return currentNumber
    }
}


deleteButton.addEventListener('click', () => {
    currentNumber = currentNumber.slice(0, currentNumber.length - 1)
    // console.log(typeof currentNumber, currentNumber)
    inputValue.value = currentNumber
})

dotButton.addEventListener('click', () => {
    if(!currentNumber.includes('.')) {
        currentNumber += '.'
        updateDisplay()
    }
})


cleanAllButton.addEventListener('click', () => {
    operator = ''
    currentNumber = ''
    previousNumber = ''
    inputValue.value = ''
})