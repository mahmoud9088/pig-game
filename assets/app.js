/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, finalScore, roundScore, activePlayer, gamePlaying, dice, dice2

reset()

document.querySelector('.dice').style.display = 'none'
document.querySelector('.dice2').style.display = 'none'

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //beggining of roll
    diceold = dice
    dice = Math.floor(Math.random() * 6) + 1
    dice2 = Math.floor(Math.random() * 6) + 1

    if (dice === 6 && diceold === 6) {
      score[activePlayer] = 0
      roundscore = 0
      document.getElementById('current-' + activePlayer).textContent =
        roundScore
      nextPlayer()
    } else {
      var diceDom = document.querySelector('.dice')
      var diceDom2 = document.querySelector('.dice2')

      diceDom.style.display = 'block'
      diceDom2.style.display = 'block'
      diceDom.src = 'assets/images/dice-' + dice + '.png'
      diceDom2.src = 'assets/images/dice-' + dice2 + '.png'

      if (dice === 1 || dice2 === 1) {
        nextPlayer()
      } else {
        roundScore = roundScore + dice + dice2
        document.querySelector('#current-' + activePlayer).textContent =
          roundScore
      }
    }

    //end of game playing
  }

  //end of rolll
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    finalScore = document.getElementById('number').value
    var winningScore
    if (finalScore) {
      winningScore = finalScore
    } else {
      winningScore = 100
    }
    // add current score to global score
    score[activePlayer] += roundScore
    // update UI
    document.querySelector('#score-' + activePlayer).textContent =
      score[activePlayer]
    // check if the player won the game
    if (score[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
      document.querySelector('.dice').style.display = 'none'
      document
        .querySelector('.player-panel-' + activePlayer)
        .classList.add('winner')
      document
        .querySelector('.player-panel-' + activePlayer)
        .classList.remove('active')
      gamePlaying = false
    } else {
      nextPlayer()
    }
  }
})

document.querySelector('.btn-new').addEventListener('click', reset)

function reset() {
  gamePlaying = true
  score = [0, 0]
  roundScore = 0
  activePlayer = 0
  document.getElementById('current-0').textContent = roundScore
  document.getElementById('current-1').textContent = roundScore
  document.getElementById('score-0').textContent = 0
  document.getElementById('score-1').textContent = 0

  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player2'

  document.querySelector('.player-panel-0').classList.remove('winner')
  document.querySelector('.player-panel-1').classList.remove('winner')
  document.querySelector('.player-panel-0').classList.remove('active')
  document.querySelector('.player-panel-1').classList.remove('active')
  document.querySelector('.player-panel-0').classList.add('active')
}

function nextPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1
  } else if (activePlayer === 1) {
    activePlayer = 0
  }
  roundScore = 0
  document.querySelector('#current-0').textContent = roundScore
  document.querySelector('#current-1').textContent = roundScore
  document.querySelector('.dice').style.display = 'none'
  document.querySelector('.dice2').style.display = 'none'
  document.querySelector('.player-panel-0').classList.toggle('active')
  document.querySelector('.player-panel-1').classList.toggle('active')
}

// document.querySelector('#current-' + activePlayer).textContent= dice;
// document.querySelector('#current-' + activePlayer).innerHTML= '<em>' + dice + '</em>';

// var x = document.querySelector('#current-' + activePlayer).textContent;
// console.log(x);
