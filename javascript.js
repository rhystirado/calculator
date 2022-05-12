// Add an array of numbers together
function add(arr) {
  return arr.reduce((sum, current) => sum + current);
}

// Add two numbers together
function addTwo(a, b) {
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

console.log(add([1, 2, 3, 4]));