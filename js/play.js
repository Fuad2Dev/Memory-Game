//how the game is played
let $previous = null;

function move(e) {
    this.style.background = "#FDA214";
    let $current = this.childNodes[0];

    $current.style.display = "block";
    this.removeEventListener("click", move);

    checkPair($current);
}

function checkPair($current) {
    // if has pair
    let isFirstPlay = ($previous == null);

    if (isFirstPlay) {
        $previous = $current;
    } else {
        let isEqual = ($previous.innerText == $current.innerText);

        if (players > 1) switchTurn(isEqual);
        else updateMoves();

        if (isEqual) {
            //remove click when isEqual
            $previous.parentNode.removeEventListener("click", move);
            $current.parentNode.removeEventListener("click", move);

            //remove background style
            $previous.parentNode.style.background = "";
            $current.parentNode.style.background = "";
            //add the matched class
            $previous.parentNode.classList.add("matched");
            $current.parentNode.classList.add("matched");
            //check if all the balls have been matched
            $size = Number(localStorage.getItem("size"));
            if (document.querySelectorAll(".matched").length == size * size) {
                //get all the scores in empty array
                $scores = [];

                document.querySelectorAll(".multi-card h3").forEach((element) => {
                    $scores.push(Number(element.innerText));
                });

                // get the max score
                if (players > 1) {

                    $max = Math.max(...$scores);

                    let playerScores = {}


                    //create a result card for each player
                    for (let index = 1; index <= $scores.length; index++) {
                        playerScores[index] = $scores[index - 1]
                    }

                    let arr = Object.entries(playerScores)
                    arr.sort((a, b) => b[1] - a[1])
                    let sortedPlayerScoresKeys = Object.fromEntries(arr)


                    for (playerScore of Object.keys(sortedPlayerScoresKeys)) {
                        const card = document.createElement("div");
                        card.setAttribute("class", "flex tile justify-between");

                        const playerDiv = document.createElement("div");
                        playerDiv.textContent = `Player ${ playerScore  }`;


                        const pairsDiv = document.createElement("div");
                        pairsDiv.textContent = `${sortedPlayerScoresKeys[playerScore]} Pairs`;

                        card.appendChild(playerDiv);
                        card.appendChild(pairsDiv);

                        document.querySelector('#result_cards').appendChild(card);
                    }


                } else {
                    let matches = document.querySelector("#moves").innerHTML

                    const card = document.createElement("div");
                    card.setAttribute("class", "flex tile justify-between");

                    const playerDiv = document.createElement("div");
                    playerDiv.textContent = `Moves Taken`;


                    const pairsDiv = document.createElement("div");
                    pairsDiv.textContent = `${matches} Moves`;

                    card.appendChild(playerDiv);
                    card.appendChild(pairsDiv);
                    document.querySelector(
                        "#who_won"
                    ).innerText = "You did it!";
                    document.querySelector('#result_cards').appendChild(card);
                    // timer
                    let timeElapsed = document.querySelector("#timer").innerHTML
                    const timerCard = document.createElement("div");
                    timerCard.setAttribute("class", "flex tile justify-between");

                    const timerDiv = document.createElement("div");
                    timerDiv.textContent = `Time Elapsed`;


                    const timersDiv = document.createElement("div");
                    timersDiv.textContent = `${timeElapsed}`;

                    timerCard.appendChild(timerDiv);
                    timerCard.appendChild(timersDiv);

                    document.querySelector('#result_cards').appendChild(timerCard);
                }

                // show modal
                document.querySelector(".modal").style.display = "block";

                //indicate a tie / winner
                if (hasDuplicateOf($max, $scores))
                    document.querySelector("#who_won").innerText = `
                    It 's a tie!`;
                else {
                    document.querySelector(
                        "#who_won"
                    ).innerText = `Player ${$scores.indexOf($max) + 1} wins!`;
                }

                //indicate winner / winners
                document.querySelectorAll(".tile").forEach((element, index) => {
                    if ($scores[index] == $max)
                        element.classList.add('winner')

                });
            }
        } else {
            $previous.parentNode.addEventListener("click", move);
            $current.parentNode.addEventListener("click", move);
            delay($previous, $current);
        }

        $previous = null;
    }
}

addEventListener("ball", "click", move);

document.querySelector('#restart').addEventListener('click', )