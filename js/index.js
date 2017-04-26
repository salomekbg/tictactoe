// load up JS function on page load
$(document).ready(function() {
  gamePlay();
  newGame();
  }
)

// count number of turns to determine player
var turn = 0;

// winning conditions to check against
var winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

// set who the winner is
var winner = "";

// clear site for a new game
function newGame() {
  var boxes = $('td');
  $('button').click(function() {
    for (i = 0;i < boxes.length; i++ ) {
      boxes[i].innerText = "";
      boxes[i].style.backgroundColor = 'black';
      $('.winner')[0].innerText = "";
    }
    winner = "";
    turn = 0;
  })
}

// run game if there is no winner yet and check if the position has already been taken
function gamePlay(){
  $('td').mouseover(function() {
    this.style.cursor = 'pointer';
  })
  $('td').click(function() {
    if (winner === "") {
      if (turn === 0 || turn % 2 === 0 && this.innerText === "") {
        this.innerText = "X";
        turn += 1;
      } else if (this.innerText === ""){
        this.innerText = "O";
        turn += 1;
      } else if (this.innerText !== ""){
        console.log("wut");
        alert("This location is taken, please try again!");
      }
      determineWinner();
    } else {
      return;
    }
  })
}

// determine who the winner is
function determineWinner() {
  var boxes = $('td');
  var boxesArray = [];
  for (i = 0; i < boxes.length; i++) {
    boxesArray[i] = boxes[i].innerText;
  }
  for (i = 0; i < winningConditions.length; i++) {
    if (boxesArray[winningConditions[i][0]] === "X" && boxesArray[winningConditions[i][1]] === "X" && boxesArray[winningConditions[i][2]] === "X") {
      boxes[winningConditions[i][0]].style.backgroundColor = 'green';
      boxes[winningConditions[i][1]].style.backgroundColor = 'green';
      boxes[winningConditions[i][2]].style.backgroundColor = 'green';
      winner = "Congrats Player X!";
      $('.winner')[0].innerText = winner;
    } else if (boxesArray[winningConditions[i][0]] === "O" && boxesArray[winningConditions[i][1]] === "O" && boxesArray[winningConditions[i][2]] === "O") {
      winner = "Congrats Player O!";
      $('.winner')[0].innerText = winner;
    } else if (turn === 9) {
      winner = "'Tis a Draw!";
      $('.winner')[0].innerText = winner;
    }
  }
}
