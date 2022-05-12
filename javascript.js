// Add two numbers together
function add(a, b) {
  return a + b;
}

// Subtract two numbers
function subtract(a, b) {
  return a - b;
}

// Multiply two numbers
function multiply(a, b) {
  return a * b;
}

// Divide two numbers
function divide(a, b) {
  return a / b;
}

// Takes an operator and two numbers and calls the appropriate function
function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return;
  }
}


// Add grid positions to the container for the buttons
const calculatorContainer = document.querySelector('.calculator-container');

// Add display to the calculator
const display = document.createElement('div');
display.classList.add('calculator-display');
calculatorContainer.append(display);

// Add buttons to the calculator
const buttonList = ['AC', '', '', '/',
                    '7', '8', '9', '*',
                    '4', '5', '6', '-',
                    '1', '2', '3', '+',
                    '0', '', '', '='];

for (const button of buttonList) {
  const buttonElement = document.createElement('button');
  buttonElement.classList.add('calculator-button');
  buttonElement.textContent = button;
  calculatorContainer.append(buttonElement);
}


// Populate the display with the digits and operators when pressed
const buttons = Array.from(document.querySelectorAll('button'));
const digitButtons = buttons.filter(button => {
  return !isNaN(button.textContent) && button.textContent;
});


// Add event listener to each button to add digit to display
digitButtons.forEach(button => {
  button.addEventListener('click', displayDigit);
})

// Operator buttons
const operatorButtons = buttons.filter(button => {
  const operators = ['+', '-', '*', '/'];
  return operators.includes(button.textContent);
});

// Write digit to display and enable operator buttons
function displayDigit() {
  const digit = this.textContent;
  display.textContent += digit;

  operatorButtons.forEach(button => {
    button.addEventListener('click', displayOperator);
  })
}

// Write operator to display and disable button
// Enabled once a digit, or equals has been pressed
function displayOperator() {
  const operator = this.textContent;
  display.textContent += operator;
  operatorButtons.forEach(button => {
    button.removeEventListener('click', displayOperator);
  });
}

// Update display with a result
function updateDisplay(result) {
  display.textContent = result;
}

// Clear display when clear button is pressed
const clearButton = buttons.find(button => button.textContent === 'AC');
clearButton.addEventListener('click', clearDisplay);

function clearDisplay() {
  display.textContent = '';
}

// Take a string with one operator and convert it to the numbers and the operator
function splitInput(str) {
  // Split on the operator and group the delimeter to keep it
  const parts = str.split(/([\+\-\*\/])/g);
  const input = {
    a: parts[0],
    b: parts[2],
    operator: parts[1]
  }
  return input;
}

const result = 0;

// Get the display string and compute the answer
function compute() {
  // Get input from calculator display
  const input = splitInput(display.textContent);
  const result = operate(input.operator, input.a, input.b);
  // Update display
  updateDisplay(result);
  console.log(result);
}

// Compute when the equals button is pressed
const equalsButton = buttons.find(button => button.textContent === '=');
equalsButton.addEventListener('click', compute);


// console.log(compute('1+2'));
// console.log(compute('1-2'));
// console.log(compute('1*2'));
// console.log(compute('1/2'));
