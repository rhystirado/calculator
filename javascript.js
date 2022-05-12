//---------- Operation Functions ----------//

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

//---------- User interface functions ----------//

// Set up calculator
function setupCalculator() {
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
}


//---------- Event listeners for buttons ----------//

// Set up the buttons and their events
function setupButtons() {
  // Digits
  setupDigitButtons();

  // Operators
  setupOperatorButtons();

  // Clear
  setupClearButton();
}

// Display digits when they are pressed
function setupDigitButtons() {
  // Populate the display with the digits and operators when pressed
  const buttons = Array.from(document.querySelectorAll('button'));
  const digitButtons = buttons.filter(button => {
    return !isNaN(button.textContent) && button.textContent;
  });
  
  // Add event listener to each button to add digit to display
  digitButtons.forEach(button => {
    button.addEventListener('click', digitClicked);
  });
}

// Store operators when they are pressed and change the style for visual
// feedback
function setupOperatorButtons() {
  // Store operator to be used next time the equals button is pressed
  const buttons = Array.from(document.querySelectorAll('button'));
  const operatorButtons = buttons.filter(button => {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(button.textContent);
  });

  operatorButtons.forEach(button => {
    button.addEventListener('click', operatorClicked);
  })
}

// Clears the display when the clear button is pressed
function setupClearButton() {
  const buttons = Array.from(document.querySelectorAll('button'));
  const clearButton = buttons.find(button => button.textContent === 'AC');
  clearButton.addEventListener('click', clearDisplay);

  
}


//---------- Global object to hold data ----------//
let data = {
  a: 0,
  b: 0,
  operator: '',
}


//---------- Event callbacks ----------//

// Write digit to display and store in global variable
// Data will always be up to date as it is continually updated
function digitClicked() {
  const digit = this.textContent;
  const display = document.querySelector('.calculator-display');
  display.textContent += digit;
  data.a = display.textContent;
}

// Updates to selected-operator class to visualise which is being used
// and removes selected-operator from all other operator buttons
function operatorClicked() {
  // Store operator
  data.operator = this.textContent;

  // Get the operator buttons
  const buttons = Array.from(document.querySelectorAll('button'));
  const operatorButtons = buttons.filter(button => {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(button.textContent);
  });

  // Visual feedback
  operatorButtons.forEach(button => {
    if (button.textContent === this.textContent) {
      button.classList.add('selected-operator');
    } else {
      button.classList.remove('selected-operator');
    }
  });
}

// Clears the display and resets the global data values
function clearDisplay() {
  const display = document.querySelector('.calculator-display');
  display.textContent = '';

  resetValues();
  resetSelected();
}

function resetValues() {
  data.a = 0;
  data.b = 0;
  data.operator = 0;
}

function resetSelected() {
  // Get the operator buttons
  const buttons = Array.from(document.querySelectorAll('button'));
  const operatorButtons = buttons.filter(button => {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(button.textContent);
  });

  // Visual feedback
  operatorButtons.forEach(button => {
    button.classList.remove('selected-operator');
  });
}



// Update display with a result
function updateDisplay(result) {
  display.textContent = result;
}



// Take a string with one operator and convert it to the numbers and the operator
function splitInput(str) {
  // Split on the operator and group the delimeter to keep it
  const parts = str.split(/([\+\-\*\/])/g);
  const input = {
    a: parseInt(parts[0]),
    b: parseInt(parts[2]),
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



// User presses numbers
//  - Display numbers
//  - Store numbers as 'a'
//
// User presses operator
//  - Store operator
// User presses numbers
//  - Display numbers
//  - Store numbers as 'b'
// User presses equals OR presses another operator
//  - Displays result of operate(operator, a, b)
//  - Stores result as 'a'
//  - Clears 'b'
//  - If operator pressed store operator

//---------- Main function ----------//
setupCalculator();
setupButtons();