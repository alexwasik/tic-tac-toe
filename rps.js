console.log('loaded rps')

const choices = ["rock", "paper", "scissors"];
const winningConditions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
}

const getCheckedRadioValue = () => {
  const element = document.getElementsByName('radioSelection');
  let userValue;

  element.forEach((el) => {
    if (el.checked) userValue = el.value
  })
  return userValue
}

const evaluate = (user, robot) => {
  const plays = {
    user,
    robot
  }
  if (user === robot) return "Draw!"
  if (winningConditions[user] === robot) {
    
    return {...plays, winner: "Player"}
  }
  return {...plays, winner: "Robot"}
}

const evaluatePlay = () => {
  const checkedValue = getCheckedRadioValue();
  const robotPlay = choices[(Math.floor(Math.random() * 3))];
  const result = evaluate(checkedValue, robotPlay)
  console.log('result', result);
  if (result === 'Draw!') {
    document.querySelector('.playResult').innerHTML = `${result}`;
  } else {
    document.querySelector('.plays').innerHTML = `
      Player: ${result.user}
      <br>
      Robot: ${result.robot}
    `
    document.querySelector('.playResult').innerHTML = `${result.winner} Wins!`
  }
}

document.getElementById('play').addEventListener('click', evaluatePlay)
