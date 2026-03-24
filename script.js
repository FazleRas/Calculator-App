let history = [];

const mathFacts = [
  "Zero is the only number that can't be represented in Roman numerals.",
  "A 'googol' is 1 followed by 100 zeros — way bigger than atoms in the universe!",
  "Pi has been calculated to over 100 trillion decimal places.",
  "The word 'hundred' comes from 'hundrath', which actually meant 120 in Old Norse.",
  "There are more possible games of chess than atoms in the observable universe.",
  "111,111,111 × 111,111,111 = 12,345,678,987,654,321",
  "The equals sign (=) was invented in 1557 by Robert Recorde.",
  "Forty is the only number spelled with letters in alphabetical order.",
  "A 'jiffy' is an actual unit of time: 1/100th of a second.",
  "The Fibonacci sequence appears in sunflower seed patterns, pinecones, and shells.",
  "Shuffling a deck of cards properly likely produces an order never seen in history.",
  "13! (13 factorial) = 6,227,020,800 — more than 6 billion!",
  "The sum of all numbers from 1 to 100 is 5,050.",
  "2 is the only even prime number.",
  "In a room of 23 people, there's a 50% chance two share a birthday.",
  "The number 1 is not considered a prime number.",
  "A 'perfect number' equals the sum of its divisors — 6 = 1+2+3.",
  "The Pythagorean theorem has over 370 known proofs.",
  "An octillion has 27 zeros after it.",
  "Multiplying any number by 9, the digits of the result always add up to 9.",
  "1/7 = 0.142857… — the digits repeat forever in a six-digit cycle.",
  "Euler’s identity: e^(iπ) + 1 = 0 combines 0, 1, π, e, and i in one tiny equation.",
  "Palindrome primes read the same forwards and backwards, e.g., 313 or 797.",
  "Harshad numbers are divisible by the sum of their digits, e.g., 18 (1+8=9 → 18 ÷ 9 = 2).",
  "Magic squares: 3x3 square where rows, columns, and diagonals sum to the same number (15 for 3x3).",
  "Graham’s number is so huge it can’t be written in the observable universe.",
  "In binary, multiplying any number by 2 just adds a zero to the end.",
  "Kaprekar’s constant (6174): repeatedly subtracting largest-smallest rearrangements always gives 6174 in 4-digit numbers.",
  "0.999… = 1 — those repeating nines actually equal one.",
  "Catalan numbers count ways to correctly match parentheses or stack objects.",
  "A googolplex is 10^(10^100) — so ridiculously huge it can’t fit in the universe.",
  "The smallest perfect number greater than 6 is 28 (divisors 1,2,4,7,14 sum to 28).",
  "The factorial of 0 is defined as 1 — mathematically convenient!",
  "There are infinitely many primes, and their distribution has patterns still studied today.",
  "A Mersenne prime is of the form 2^p − 1, where p is prime.",
  "The sum of the first n odd numbers equals n squared, e.g., 1+3+5=9.",
  "Champernowne’s constant: 0.123456789101112… concatenates all integers and is normal in base 10.",
  "A “googolplexian” is 10^(10^(10^100)) — basically impossible to imagine.",
  "The number e shows up everywhere: compound interest, calculus, probability, and more.",
  "Some numbers are amicable: two numbers where each is the sum of the other’s proper divisors, e.g., 220 and 284."
];

let lastFactIndex = -1;

function newFact() {
  let index;
  do {
    index = Math.floor(Math.random() * mathFacts.length);
  } while (index === lastFactIndex);
  lastFactIndex = index;

  const el = document.getElementById("factText");
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = mathFacts[index];
    el.style.opacity = 1;
  }, 200);
}

function appendValue(value) {
  let displayVal = display.value;
  if (value === "." && displayVal.endsWith(".")) return;
  display.value += value;
}

function calculate() {
  try {
    let expression = display.value;
    let result = eval(expression);
    if (Math.abs(result) > 1e9 || (Math.abs(result) < 1e-6 && result !== 0)) {
      result = result.toExponential(6);
    } else {
      result = parseFloat(result.toPrecision(10));
    }
    addToTape(expression, result);
    display.value = result;
    newFact();
  } catch (e) {
    display.value = "Error";
  }
}

function appendDecimal() {
  let displayVal = display.value;
  let lastNumber = displayVal.split(/[\+\-\*\/]/).pop();
  if (!lastNumber.includes(".")) {
    display.value += ".";
  }
}

function calculateSqrt() {
  try {
    let expression = display.value;
    let value = parseFloat(expression);
    if (value < 0) {
      display.value = "Error";
    } else {
      let result = parseFloat(Math.sqrt(value).toPrecision(10));
      addToTape(`√(${expression})`, result);
      display.value = result;
      newFact();
    }
  } catch (e) {
    display.value = "Error";
  }
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function randomizeColor() {
  const min = 0;   
  const max = 200; 
  const r = Math.floor(Math.random() * (max - min + 1)) + min;
  const g = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;

  const randomColor = `rgb(${r}, ${g}, ${b})`;
  document.querySelector('.calculator').style.backgroundColor = randomColor;
  document.querySelector('.tape-panel').style.backgroundColor = randomColor;
}

function addToTape(expression, result) {
  history.push({ expression, result });
  const container = document.getElementById("tapeEntries");
  const empty = container.querySelector(".tape-empty");
  if (empty) empty.remove();
  const entry = document.createElement("div");
  entry.className = "tape-entry";
  entry.innerHTML = `<span class="tape-expr">${expression}</span><span class="tape-eq">= ${result}</span>`;
  container.appendChild(entry);
  container.scrollTop = container.scrollHeight;
}

function clearTape() {
  history = [];
  const container = document.getElementById("tapeEntries");
  container.innerHTML = `<p class="tape-empty">No calculations yet...</p>`;
}

function toggleTape() {
  const panel = document.getElementById("tapePanel");
  panel.classList.toggle("tape-visible");
  const btn = document.getElementById("tapeBtn");
  btn.textContent = panel.classList.contains("tape-visible") ? "✖ History" : "History";
}

newFact();
