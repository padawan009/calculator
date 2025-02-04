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
    if (currentNumber === '' && previousNumber === '') {
        if (event.target.textContent !== '-') {
            return 
        }   
        else currentNumber = '-'
    }
    else if (currentNumber === '' && previousNumber !== '' && event.target.textContent === '=') {
        return 
    }
    else if (previousNumber === '') {
        previousNumber = parseFloat(currentNumber)
        currentNumber = ''
    }
    else if (previousNumber !== '' && currentNumber !== '') {
        currentNumber = parseFloat(currentNumber)
        previousNumber = operate(operator, currentNumber, previousNumber)
        currentNumber = ''
        operator = ''
    }
    operator = event.target.textContent
      // console.log(typeof previousNumber)
    if (previousNumber.toString().includes('.')) {
        previousNumber = checkDecimal(previousNumber);
    }
    updateDisplay()
}

function checkDecimal(number) {
    if (typeof number === 'number' && !Number.isInteger(number)) {
        return parseFloat(number.toFixed(5));
    }
    return number;
}

function updateDisplay() {
    if (isError()) {
        inputValue.value = previousNumber;
        previousNumber = ''
        return;
    }

    if (hasBothNumbersAndOperator()) {
        inputValue.value = `${previousNumber} ${operator} ${currentNumber}`;
        return;
    }

    if (hasPreviousNumberAndOperator()) {
        inputValue.value = `${previousNumber} ${operator}`;
        return;
    }

    if (hasOnlyPreviousNumber()) {
        inputValue.value = previousNumber;
        return;
    }

    inputValue.value = currentNumber;
}

function isError() {
    return previousNumber === 'You shall not pass!';
}

function hasBothNumbersAndOperator() {
    return previousNumber !== '' && operator !== '' && currentNumber !== '' && operator !== '=';
}

function hasPreviousNumberAndOperator() {
    return previousNumber !== '' && operator !== '' && operator !== '=' && currentNumber === '';
}

function hasOnlyPreviousNumber() {
    return previousNumber !== '' && (operator === '' || operator === '=');
}



function operate(operator, currentNumber, previousNumber) {
    switch(operator) {
        case '+': 
            return previousNumber + currentNumber
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
    if (currentNumber.length > 0) {
        currentNumber = currentNumber.slice(0, -1)
    // console.log(typeof currentNumber, currentNumber)
     updateDisplay()
    }

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