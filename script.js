const operatorButtons = document.getElementsByClassName('operator-button')
const numericButtons = document.getElementsByClassName('number-button')
const equalButton = document.getElementById('equal')
const cleanAllButton = document.getElementById('clean-all')
const deleteButton = document.getElementById('delete')
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
    console.log(currentNumber)
    console.log(previousNumber)
    updateDisplay()
}

function getOperator (event) {
    console.log(operator)
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
    console.log(previousNumber)
    updateDisplay()
}

function updateDisplay() {
    if (previousNumber !== '' && operator !== '' && currentNumber !== '') {
        inputValue.value = `${previousNumber} ${operator} ${currentNumber}`
    } 
    else if (previousNumber !== '' && operator !== '' && operator !== '=' && currentNumber === '') {
        inputValue.value = `${previousNumber} ${operator}`
    } 
    else if (previousNumber !== '' && (operator === '' || operator === '=')) {
        inputValue.value = previousNumber
    } 
    else  {
        inputValue.value = currentNumber;
    }
}


// function getResult () {

// }


function operate(operator, currentNumber, previousNumber) {
    switch(operator) {
        case '+': 
            return previousNumber + currentNumber
        case '-':
            return previousNumber - currentNumber
        case '*': 
             return previousNumber * currentNumber
        case '/': 
             return currentNumber === 0 ? "Error" : previousNumber / currentNumber
        case '=':
            return previousNumber
        default:
            return currentNumber
    }
}

// equalButton.addEventListener('click', () => {
//     inputValue.value = previousNumber;
// })

deleteButton.addEventListener('click', () => {
    currentNumber = currentNumber.slice(0, currentNumber.length - 1)
    // console.log(typeof currentNumber, currentNumber)
    inputValue.value = currentNumber
})

cleanAllButton.addEventListener('click', () => {
    operator = ''
    currentNumber = ''
    previousNumber = ''
    inputValue.value = ''
})