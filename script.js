const operatorButtons = document.getElementsByClassName('operator-button')
const numericButtons = document.getElementsByClassName('number-button')
const equalButton = document.getElementById('equal')
const cleanAllButton = document.getElementById('clean-all')
const deleteButton = document.getElementById('delete')
const inputValue = document.getElementById('display')
let currentNumber = ''
let previousNumber = ''
let operator = ''


Array.from(numericButtons).forEach(button => {
    button.addEventListener('click', getInputeValue);
    // currentNumber = Number(currentNumber)
    // console.log(currentNumber, typeof currentNumber)
})


function getInputeValue() {
    
    currentNumber += inputValue.value
    inputValue.value = currentNumber
    console.log(currentNumber)
    console.log(inputValue.value)

}



// Array.from(operatorButtons).forEach(button => {
//     button.addEventListener('click', getInputeValue)
// })

function operate(operator, currentNumber, previousNumber) {
    switch(operator) {
        case '+': 
            return previousNumber + currentNumber
        case '-':
            return previousNumber - currentNumber
        case '*': 
             return previousNumber * currentNumber
        case '/': 
             return currentNumber === 0 ? "Ошибка: делить на ноль нельзя!" : previousNumber / currentNumber
    }
    return 
}

