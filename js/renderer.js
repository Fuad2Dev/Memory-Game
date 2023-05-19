let size = Number(localStorage.getItem("size"));
let players = Number(localStorage.getItem("players"));
let theme = localStorage.getItem("theme")

// board generation
// create the board <div> element
const board = document.createElement("div");
board.classList.add("space-y", "flex", "flex-column", "py");
board.style.maxWidth = "532px";

// create four/six child <div> elements with the class "flex space-x justify-between"
for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("flex", "space-x", "justify-between");

    // create four/six <div> elements with the class "ball ball-big ball-close"
    for (let j = 0; j < size; j++) {
        const ball = document.createElement("div");
        ball.classList.add(
            "ball",
            size == 4 ? "ball-big" : "ball-small",
            "ball-close"
        );

        // create a <span> element and append it to the ball <div>
        const span = document.createElement("span");
        ball.appendChild(span);

        // append the ball <div> to the row <div>
        row.appendChild(ball);
    }

    // append the row <div> to the parent <div>
    board.appendChild(row);
}

// scoreboard generation
// append the board <div> to the document body
const playgroundDomInnerHtml = document.querySelector("#playground").innerHTML
document.querySelector("#playground").innerHTML = board.innerHTML + playgroundDomInnerHtml

//Generating the score board / arrow element on top of cards
if (players > 1) {
    for (let i = 0; i < players; i++) {
        card = document.createElement("div");
        arrow = document.createElement("div")
        card.classList.add("multi-card");
        arrow.classList.add("arrow")
        if (i == 0) arrow.style.display = "block"

        p_large = document.createElement("p");
        p_large.classList.add("hide-large");
        p_large.innerText = "p" + (i + 1);

        p_small = document.createElement("p");
        p_small.classList.add("hide-small");
        p_small.innerText = "Player " + (i + 1);

        h3 = document.createElement("h3");

        h3.innerText = 0;
        card.appendChild(arrow)
        card.appendChild(p_large);
        card.appendChild(p_small);
        card.appendChild(h3);

        document.querySelector("#scoreboard").append(card);
    }
    document.querySelector(".multi-card").classList.add("turn");
} else {
    const soloCardHtml = `
<div class="solo-card">
  <p>Time</p>
  <h3 id="timer">0:00</h3>
</div>
<div class="solo-card">
  <p>Moves</p>
  <h3 id="moves">0</h3>
</div>
`;

    document.querySelector("#scoreboard").innerHTML = soloCardHtml;

    // Select the timer element from the DOM
    const timerElement = document.getElementById("timer");


    startTimer(timerElement)
}

// generate numbers on board
$arr = generateNumbers(size);

if (theme === "icons") {


    $balls = document.querySelectorAll(".ball");
    $balls.forEach((element) => {

        const randomNumber = removeRandomElement($arr);
        // adding icon to hmtl element 
        element.childNodes[0].innerHTML = `<p class="rounds" >
        ${randomNumber[1]}
        </p>`
            // adding number dataset to html 
        element.childNodes[0].dataset.number = randomNumber[0]
    });
    // hide board values
    $balls.forEach((element) => {
        element.childNodes[0].style.display = "none";
    });
} else {
    // scatter generated numbers on board
    $balls = document.querySelectorAll(".ball");
    $balls.forEach((element) => {
        const randomNumber = removeRandomElement($arr);
        element.childNodes[0].innerText = randomNumber[0]
        element.childNodes[0].dataset.number = randomNumber[0]
    });

    // hide board values
    $balls.forEach((element) => {
        element.childNodes[0].style.display = "none";
    });
}