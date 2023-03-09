let $previous = null;

function move(e) {
    let $current = this.childNodes[0];

    $current.style.display = "block";

    checkPair($current);
}

function checkPair($current) {
    // if has pair
    let isFirstPlay = ($previous == null)

    if (isFirstPlay) {
        $previous = $current;
    } else {
        let isEqual = $previous.innerText == $current.innerText

        switchTurn(isEqual);

        if (isEqual) {
            $previous.parentNode.removeEventListener("click", move);
            $current.parentNode.removeEventListener("click", move);
            let $prev = $previous.parentNode.style
            $previous.parentNode.style.backgroundColor = "#FDA214"
            $current.parentNode.style.backgroundColor = "#FDA214"
            setTimeout(() => {
                    $prev.backgroundColor = "#BCCED9"
                    $current.parentNode.style.backgroundColor = "#BCCED9"
                },
                1000)
        } else {
            delay($previous, $current);
        }

        $previous = null;
    }
}

addEventListener("ball", "click", move);