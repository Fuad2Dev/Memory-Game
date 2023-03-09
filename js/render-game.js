$players = localStorage.getItem("players");
$size = localStorage.getItem("size");

// generate numbers on board
$arr = generateNumbers($size[0]);

// scatter generated numbers on board
$balls = document.querySelectorAll(".ball");
$balls.forEach((element) => {
  element.childNodes[0].innerText = removeRandomElement($arr);
});

// hide board values
$balls.forEach((element) => {
  element.childNodes[0].style.display = "none";
});

// trim players
$turns = document.querySelectorAll(".multi-card");
for (let index = 3; index >= $players[0]; index--)
  $turns[index].parentNode.removeChild($turns[index]);
