// An array if icons 
const ICONS = ["&#10054;", "&#9763;", "&#9760;", "&#9766;",
    "&#9770;", "&#9775;", "&#9798;", "&#9785;",
    "&#9812;", "&#9815;", "&#9816;", "&#9832;",
    "&#9840;", "&#9874;", "&#9878;", "&#9879;",
    "&#9880;", "&#9881;", "&#9882;", "&#9883;",
    "&#10028;", "&#10021;", "&#10039;", "&#10086;"

]


function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function addEventListener(className, event, fn) {
    var list = document.querySelectorAll(`.${className}`);

    for (var i = 0, len = list.length; i < len; i++)
        list[i].addEventListener(event, fn, false);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 100);
}

function generateNumbers(size) {
    const randomArray = [];
    for (let i = 0; i < (size * size) / 2;) {
        let randomNumber = generateRandomNumber();
        if (randomArray.indexOf(randomNumber) === -1) {
            randomArray.push(randomNumber);
        } else {
            continue;
        }
        i++;

    }

    let icons = shuffleArray(ICONS).slice(0, (size * size) / 2)
    icons = [...icons, ...icons]

    let randomMatrix = [...randomArray, ...randomArray].map(function(item, index) {
        console.log(item, icons[index]);
        return [item, icons[index]]
    })



    return randomMatrix;
}

function removeRandomElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return array.splice(index, 1)[0];
}

function delay($previous, $current) {
    setTimeout(function() {
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
    if (isEqual) {
        let score = document.querySelector(".turn h3")
        score.innerText = Number(score.innerText) + 1
    }
    document
        .querySelectorAll(".multi-card")[localStorage.getItem("turn")].classList.remove("turn");

    if (localStorage.getItem("turn") == localStorage.getItem("players") - 1) {
        localStorage.setItem("turn", 0);
    } else {
        localStorage.setItem("turn", Number(localStorage.getItem("turn")) + 1);
    }

    // console.log(localStorage.getItem("turn") and arrow);
    document
        .querySelectorAll(".multi-card")[localStorage.getItem("turn")].classList.add("turn");
    document.querySelectorAll(".arrow").forEach((elem) => {
        elem.style.display = "none"
    })
    document
        .querySelectorAll(".arrow")[localStorage.getItem("turn")].style.display = "block";
}
intervalId = null

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

function hasDuplicateOf(num, arr) {
    const duplicates = arr.filter((val, index) => {
        return arr.indexOf(val) !== index && val === num;
    });

    return duplicates.length > 0
}