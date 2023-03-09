let size = Number(localStorage.getItem('size'))
let players = Number(localStorage.getItem('players'))

// create the parent <div> element
const container = document.createElement('div');
container.id = 'playground';
container.classList.add('space-y', 'flex', 'flex-column', 'py');
container.style.maxWidth = '532px';

// create four child <div> elements with the class "flex space-x justify-between"
for (let i = 0; i < size; i++) {
  const row = document.createElement('div');
  row.classList.add('flex', 'space-x', 'justify-between');
  
  // create four <div> elements with the class "ball ball-big ball-close"
  for (let j = 0; j < size; j++) {
    const ball = document.createElement('div');
    ball.classList.add('ball', size == 4 ?  'ball-big' : 'ball-small' , 'ball-close');
    
    // create a <span> element and append it to the ball <div>
    const span = document.createElement('span');
    ball.appendChild(span);
    
    // append the ball <div> to the child <div>
    row.appendChild(ball);
  }
  
  // append the child <div> to the parent <div>
  container.appendChild(row);
}

// append the parent <div> to the document body
document.querySelector('#playground').appendChild(container);



for (let i = 0; i < players; i++) {
  card = document.createElement('div');
  card.classList.add('multi-card')

  p_large = document.createElement('p');
  p_large.classList.add('hide-large');
  p_large.innerText = 'p' + (i + 1);

  p_small = document.createElement('p');
  p_small.classList.add('hide-small')
  p_small.innerText = 'Player ' + (i + 1)

  h3 = document.createElement('h3');
  h3.innerText = 0

  card.appendChild(p_large)
  card.appendChild(p_small)
  card.appendChild(h3)

  document.querySelector('#scoreboard').append(card)

}
document.querySelector('.multi-card').classList.add("turn")


// generate numbers on board
$arr = generateNumbers(size);

// scatter generated numbers on board
$balls = document.querySelectorAll(".ball");
$balls.forEach((element) => {
  element.childNodes[0].innerText = removeRandomElement($arr);
});

// hide board values
$balls.forEach((element) => {
  element.childNodes[0].style.display = "none";
}); 