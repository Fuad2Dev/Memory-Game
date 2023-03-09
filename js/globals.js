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
    setTimeout(function() {
        $current.style.display = "none";
        $previous.style.display = "none";
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
    document.querySelector(".turn").classList.remove("turn");

    if (localStorage.getItem("turn") == localStorage.getItem("players") - 1) {
        localStorage.setItem("turn", 0);
    } else {
        localStorage.setItem("turn", Number(localStorage.getItem("turn")) + 1);
    }

    // console.log(localStorage.getItem("turn"));
    document
        .querySelectorAll(".multi-card")[localStorage.getItem("turn")].classList.add("turn");
}

const home = () => {
    localStorage.clear()
    location.href = "index.html"
}