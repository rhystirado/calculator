// Add an array of numbers together
function add(arr) {
  return arr.reduce((sum, current) => sum + current);
}

console.log(add([1, 2, 3, 4]));