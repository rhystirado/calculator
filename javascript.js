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
display.textContent = '1234567890';
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