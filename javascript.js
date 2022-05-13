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
  a: null,
  b: null,
  displayNumber: '',
  operator: null,
}


//---------- Event callbacks ----------//

// Write digit to display and store in global variable
// Data will always be up to date as it is continually updated
function digitClicked() {
  const digit = this.textContent;
  data.displayNumber += digit;
  displayNumber(data.displayNumber);

  // Store a unless there is currently an operator, then store b
  if (!data.operator) {
    data.a = +data.displayNumber;
  } else {
    data.b = +data.displayNumber;
  }
}

// Updates to selected-operator class to visualise which is being used
// and removes selected-operator from all other operator buttons
function operatorClicked() {
  // Store the clicked operator
  const clickedOperator = this.textContent;
  // Get the operator buttons
  const buttons = Array.from(document.querySelectorAll('button'));
  const operatorButtons = buttons.filter(button => {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(button.textContent);
  });

  // Visual feedback
  operatorButtons.forEach(button => {
    if (button.textContent === clickedOperator) {
      button.classList.add('selected-operator');
    } else {
      button.classList.remove('selected-operator');
    }
  });

  // Clear the display number for the next result
  data.displayNumber = '';

  // Perform operation if 'b' exists and the operator is not equal to 
  // the stored operator
  if (data.operator && data.b) {
    const result = operate(data.operator, data.a, data.b);
    // Display the result
    displayNumber(result);
    // Store result as 'a' and clear 'b'
    data.a = result;
    data.b = null;
    data.displayNumber = '';
  }

  // Store the new operator
  data.operator = clickedOperator;
}

// Clears the display and resets the global data values
function clearDisplay() {
  const display = document.querySelector('.calculator-display');
  display.textContent = '';

  resetValues();
  resetSelected();
}

//---------- Helper functions ----------//

// Reset the global values
function resetValues() {
  data.a = null;
  data.b = null;
  data.displayNumber = '';
  data.operator = null;
}

// Reset the selected operator buttons on the user interface
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

// Puts a number onto the display
function displayNumber(number) {
  const display = document.querySelector('.calculator-display');
  display.textContent = number;
}







// Update display with a result
function updateDisplay(result) {
  display.textContent = result;
}



// If an operator or equals is pressed and there is already an operator and b
// then do the operation and store the result in a




//---------- Steps to run ----------//

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
//  - If operator pressed store operatorm


// If there is no operator - store 'a'
// If there is an operator - store 'b'
// If there is an operator and 'b', and another operator or equals is pressed - 
//    do calculation and store in 'a'
//    If operator then store as operator

//---------- Main function ----------//
setupCalculator();
setupButtons();