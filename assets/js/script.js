const numbers = document.querySelectorAll(".calc-number");
const calculatorScreen = document.querySelector(".calc-screen");
const operators = document.querySelectorAll(".calc-operator");
const equalSign = document.querySelector(".calc-equal");
const clearBtn = document.querySelector(".all-clear");
const decimal = document.querySelector(".calc-decimal");
const backspaces = document.querySelector(".calc-backspace");
const percentages = document.querySelector(".percentage");

let prevNumber = "";
let calculationOperator = "";
let currentNumber = "0";

const updateScreen = (number) => {
  calculatorScreen.value = number;
};

// Percentage
const divPercent = (number) => {
  if (currentNumber === "0") {
    currentNumber = number;
  } else {
    currentNumber /= 100;
  }
};

percentages.addEventListener("click", (event) => {
  divPercent(event.target.value);
  updateScreen(currentNumber);
});
// End of Percentage

// Input number
const inputNumber = (number) => {
  if (currentNumber === "0") {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
};

const deleteNumber = () => {
  if (currentNumber.length > 1) {
    currentNumber = currentNumber.slice(0, -1);
  } else {
    currentNumber = "0";
  }
};

backspaces.addEventListener("click", (event) => {
  deleteNumber(event.target.value);
  updateScreen(currentNumber);
});

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    inputNumber(event.target.value);
    updateScreen(currentNumber);
  });
});
// End of Input number

// Operator
operators.forEach((operator) => {
  operator.addEventListener("click", (event) => {
    inputOperator(event.target.value);
  });
});

const inputOperator = (operators) => {
  if (calculationOperator === "") {
    prevNumber = currentNumber;
  }

  calculationOperator = operators;
  currentNumber = "0";
};
// End of Operator

// Equals
equalSign.addEventListener("click", () => {
  calculate();
  updateScreen(currentNumber);
  console.log(currentNumber);
});

const calculate = () => {
  let result = "";
  switch (calculationOperator) {
    case "+":
      result = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case "-":
      result = prevNumber - currentNumber;
      break;
    case "%":
      result = prevNumber % currentNumber;
      break;
    case "*":
      result = prevNumber * currentNumber;
      break;
    case "/":
      result = prevNumber / currentNumber;
      break;
    default:
      return;
  }
  currentNumber = result;
  calculationOperator = "";
};
// End of Equals

// Clear
clearBtn.addEventListener("click", () => {
  clearAll();
  updateScreen(currentNumber);
});

const clearAll = () => {
  prevNumber = "";
  calculationOperator = "";
  currentNumber = "0";
};
// End of Clear

// Decimal
decimal.addEventListener("click", (event) => {
  inputDecimal(event.target.value);
  updateScreen(currentNumber);
});

inputDecimal = (dot) => {
  if (currentNumber.includes(".")) {
    return;
  }
  currentNumber += dot;
};
// End of Decimal

// Keypress interception
document.addEventListener("keypress", function (event) {
  var charCode = typeof event.which == "number" ? event.which : event.keyCode;
  var string = String.fromCharCode(charCode);

  event.preventDefault();

  if (charCode && !isNaN(string)) {
    inputNumber(string);
    updateScreen(currentNumber);
    return;
  }

  switch (string) {
    case "+":
    case "-":
    case "/":
    case "*":
      inputOperator(string);
      return;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.code === "Enter") {
    event.preventDefault();
    document.querySelector(".calc-equal").click();
  } else if (event.code === "Backspace") {
    deleteNumber();
    updateScreen(currentNumber);
  }
});
// End of keypress interception
