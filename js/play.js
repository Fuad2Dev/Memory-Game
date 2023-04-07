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
  let isFirstPlay = $previous == null;

  if (isFirstPlay) {
    $previous = $current;
  } else {
    let isEqual = $previous.innerText == $current.innerText;

    if (players > 1) switchTurn(isEqual);
    else updateMoves();

    if (isEqual) {
      $previous.parentNode.removeEventListener("click", move);
      $current.parentNode.removeEventListener("click", move);

      $previous.parentNode.style.background = "";
      $current.parentNode.style.background = "";

      $previous.parentNode.classList.add("matched");
      $current.parentNode.classList.add("matched");

      $size = Number(localStorage.getItem("size"));
      if (document.querySelectorAll(".matched").length == size * size) {
        $scores_dom = document.querySelectorAll(".multi-card h3");

        $scores = [];

        document.querySelectorAll(".multi-card h3").forEach((element) => {
          $scores.push(Number(element.innerText));
        });

        // console.log($scores);

        $max = Math.max(...$scores);

        for (
          let index = 0;
          index < Number(localStorage.getItem("players"));
          index++
        ) {
          const div = document.createElement("div");
          div.setAttribute("class", "flex tile justify-between");

          const playerDiv = document.createElement("div");
          playerDiv.textContent = `Player ${index + 1}`;

          const pairsDiv = document.createElement("div");
          pairsDiv.textContent = `${$scores[index]} Pairs`;

          div.appendChild(playerDiv);
          div.appendChild(pairsDiv);

          document.querySelector('#result_cards').appendChild(div);
        }

        document.querySelector(".modal").style.display = "block";

        document.querySelectorAll(".multi-card h3").forEach((element) => {
          if (element.innerText == $max)
            element.parentNode.classList.add("winner");
        });

        if (hasDuplicateOf($max, $scores))
          document.querySelector("#who_won").innerText = `It's a tie!`;
        else{
          document.querySelector(
            "#who_won"
          ).innerText = `Player ${$scores.indexOf($max) + 1} wins!`;
        }

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