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

                $max = Math.max(...$scores);
                //create a result card for each player
                for (
                    let index = 0; index < Number(localStorage.getItem("players")); index++
                ) {
                    const card = document.createElement("div");
                    card.setAttribute("class", "flex tile justify-between");

                    const playerDiv = document.createElement("div");
                    playerDiv.textContent = `Player ${index + 1}`;

                    const pairsDiv = document.createElement("div");
                    pairsDiv.textContent = `${$scores[index]} Pairs`;

                    card.appendChild(playerDiv);
                    card.appendChild(pairsDiv);

                    document.querySelector('#result_cards').appendChild(card);
                }
                // show modal
                document.querySelector(".modal").style.display = "block";

                //indicate a tie / winner
                if (hasDuplicateOf($max, $scores))
                    document.querySelector("#who_won").innerText = `It's a tie!`;
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