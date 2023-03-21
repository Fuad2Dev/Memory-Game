let $previous = null;

function move(e) {
  let $current = this.childNodes[0];

  $current.style.display = "block";

  checkPair($current);
}

function checkPair($current) {
  // if has pair
  if ($previous != null) {
    switchTurn();
    if ($previous.innerText != $current.innerText) {
      delay($previous, $current);
    } else {
      $previous.parentNode.removeEventListener("click", move);
      $current.parentNode.removeEventListener("click", move);
    }

    $previous = null;
  } else {
    $previous = $current;
  }
}

addEventListener("ball", "click", move);
