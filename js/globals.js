function addEventListener(className, event, fn) {
  var list = document.querySelectorAll(`.${className}`);

  for (var i = 0, len = list.length; i < len; i++)
    list[i].addEventListener(event, fn, false);
}

function generateNumbers(size) {
  const randomArray = [];
  for (let i = 0; i < (size * size) / 2; i++) {
    randomArray.push(Math.floor(Math.random() * 100));
  }
  return [...randomArray, ...randomArray];
}

function removeRandomElement(array) {
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
}

function delay($previous, $current) {
  setTimeout(function () {
    $current.style.display = "none";
    $previous.style.display = "none";

    $previous.parentNode.style.background = "";
    $current.parentNode.style.background = "";
  }, 1000);
}

function preventBackRoute() {
  window.history.forward();
}

function switchTurn(isEqual) {
  if(isEqual){
    let score = document.querySelector(".turn h3")
    score.innerText = Number(score.innerText) + 1
  } 
  document
    .querySelectorAll(".multi-card")
    [localStorage.getItem("turn")].classList.remove("turn");

  if (localStorage.getItem("turn") == localStorage.getItem("players") - 1) {
    localStorage.setItem("turn", 0);
  } else {
    localStorage.setItem("turn", Number(localStorage.getItem("turn")) + 1);
  }

  // console.log(localStorage.getItem("turn"));
  document
    .querySelectorAll(".multi-card")
    [localStorage.getItem("turn")].classList.add("turn");
}

function startTimer(timerElement) {
  // Save the current timestamp
  const startTime = Date.now();

  // Start the timer by updating the elapsed time every second
  intervalId = setInterval(() => {
    // Calculate the elapsed time by subtracting the start time from the current time
    elapsedTime = Date.now() - startTime;

    // Format the elapsed time as MM:SS
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((elapsedTime / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const timeString = `${minutes}:${seconds}`;

    // Update the timer element with the elapsed time
    timerElement.textContent = timeString;
  }, 1000);
}

function stopTimer() {
  // Stop the timer by clearing the interval ID
  clearInterval(intervalId);
}

function updateMoves() {
  moves_dom = document.querySelector("#moves");
  moves_dom.innerText = Number(moves_dom.innerText) + 1;
}

function hasDuplicateOf(num, arr){
  const duplicates = arr.filter((val, index) => {
    return arr.indexOf(val) !== index && val === num;
  });
  
  return duplicates.length > 0
}

function draw(){
  alert('draw')
}

function win($max, $scores){
  $player = $scores.indexOf($max) + 1
  alert(`player ${player} wins`)
}