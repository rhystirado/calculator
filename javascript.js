//---------- Operation Functions ----------//

// Add two numbers together
function add(a, b) {
  // Calculate scale factor for decimals
  const scaleFactor = calculateScaleFactor(a, b);
  // Convert decimals to integers and perform addition, then correct for
  // scale factor
  return ((a * scaleFactor) + (b * scaleFactor)) / (scaleFactor);
}

// Subtract two numbers
function subtract(a, b) {
  // Calculate scale factor for decimals
  const scaleFactor = calculateScaleFactor(a, b);
  // Convert decimals to integers and perform addition, then correct for
  // scale factor
  return ((a * scaleFactor) - (b * scaleFactor)) / (scaleFactor);
}

// Multiply two numbers
function multiply(a, b) {
  // Calculate scale factor for decimals
  const scaleFactor = calculateScaleFactor(a, b);
  // Convert decimals to integers and perform multiplication, then correct for
  // scale factor
  return (a * scaleFactor) * (b * scaleFactor) / (scaleFactor * scaleFactor);
}

// Divide two numbers
function divide(a, b) {
  // Calculate scale factor for decimals
  const scaleFactor = calculateScaleFactor(a, b);
  // Convert decimals to integers and perform division, which also removes the
  // scale factor
  return (a * scaleFactor) / (b * scaleFactor);
}

// Scale decimals to integers and return the scale factor
function calculateScaleFactor(a, b) {
  // If a is not an integer, convert it to an integer and keep number of scales
  let scaleFactorA = 1;
  let scaledA = a;
  while (scaledA % 1 != 0) {
    scaledA *= 10;
    scaleFactorA *= 10;
  }
  
  // Test b to check if scale factor neeeded
  let scaleFactorB = 1;
  let scaledB = b;
  while (scaledB % 1 != 0) {
    scaledB *= 10;
    scaleFactorB *= 10;
  }
  
  // Use largest scale factor to perform calculations
  return (scaleFactorA >= scaleFactorB) ? scaleFactorA : scaleFactorB;
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
                      '0', '', '.', '='];
  
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

  // Equals button
  setupEqualsButton();

  // Decimal button
  setupDecimalButton();
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
  clearButton.addEventListener('click', clearClicked);
}

// Equals button calculates the result when pressed
function setupEqualsButton() {
  const buttons = Array.from(document.querySelectorAll('button'));
  const equalsButton = buttons.find(button => button.textContent === '=');
  equalsButton.addEventListener('click', equalsClicked);
}

// Decimal button can add up to one decimal point when pressed
function setupDecimalButton() {
  const buttons = Array.from(document.querySelectorAll('button'));
  const decimalButton = buttons.find(button => button.textContent === '.');
  decimalButton.addEventListener('click', decimalClicked);
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
  updateDisplay(data.displayNumber);

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
  const isValidOperation = data.operator && !isNaN(data.a) && !isNaN(data.b) &&
    data.a && data.b;
  if (isValidOperation) {
    // Store result as 'a' and clear 'b'
    data.a = calculateResult();
    data.b = null;
    data.displayNumber = '';
  }

  // Store the new operator
  data.operator = clickedOperator;
  resetDecimal();
}

// Clears the display and resets the global data values
function clearClicked() {
  const display = document.querySelector('.calculator-display');
  display.textContent = '';

  resetValues();
  resetSelected();
  resetDecimal();
}

// Operates on the data and displays the result
function equalsClicked() {
  // Only do something if there is an operator, 'a', and 'b' and it is a number
  const isValidOperation = data.operator && !isNaN(data.a) && !isNaN(data.b) &&
    data.a && data.b;
  if (isValidOperation) {
    // Store result in 'a' and clear other data values
    data.a = calculateResult();
    data.b = null;
    data.displayNumber = '';
    data.operator = null;
    // Reset the selected operators on the UI
    resetSelected();
  }
}

// Adds a decimal place to the current value
// Disables itself after it has been pressed and only re-enables when a result
// is calculated
function decimalClicked() {
  // Add a decimal and display the new number
  data.displayNumber += '.';
  updateDisplay(data.displayNumber);

  // Store as 'a' unless there is currently an operator and a is valid input,
  // then store as 'b'
  const isValidInputA = !isNaN(data.a) && data.a;
  const isValidInputB = !isNaN(data.b) && data.b;
  if (!data.operator && isValidInputA) {
    data.a = +data.displayNumber;
  } else if (!data.operator && isValidInputB) {
    data.b = +data.displayNumber;
  }

  // Disable the decimal button
  const buttons = Array.from(document.querySelectorAll('button'));
  const decimalButton = buttons.find(button => button.textContent === '.');
  decimalButton.removeEventListener('click', decimalClicked);
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

// Updates the display with a number
function updateDisplay(number) {
  const display = document.querySelector('.calculator-display');
  display.textContent = number;
}

// Calculate and display the result
function calculateResult() {
  // If trying to divide by 0, display a message
  let result;
  if (data.b === 0 && data.operator === '/') {
    result = 0;
    updateDisplay('pls no');
  } else {
    result = operate(data.operator, data.a, data.b);
    // Display the result
    updateDisplay(result);
  }

  // Re-enable the decimal point
  resetDecimal();

  return result;
}

// Enables the decimal button
function resetDecimal() {
  const buttons = Array.from(document.querySelectorAll('button'));
  const decimalButton = buttons.find(button => button.textContent === '.');
  decimalButton.addEventListener('click', decimalClicked);
}



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