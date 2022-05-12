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

console.log(operate('+', 4, 2));
console.log(operate('-', 4, 2));
console.log(operate('*', 4, 2));
console.log(operate('/', 4, 2));