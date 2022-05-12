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
const displayText = '';
display.textContent = displayText;
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

// 

// Populate the display with the digits when pressed
const buttons = Array.from(document.querySelectorAll('button'));
const digitButtons = buttons.filter(button => {
  return !isNaN(button.textContent) && button.textContent;
});

// Add event listener to each button to add digit to display
digitButtons.forEach(button => {
  button.addEventListener('click', displayDigit);
})

// Write digit to display
function displayDigit() {
  const digit = this.textContent;
  display.textContent += digit;
}