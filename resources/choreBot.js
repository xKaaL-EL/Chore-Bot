// Declaring all the variables using DOM.
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
let currentStreak = document.getElementById('currentScore');
let bestStreak = document.getElementById('streak');
let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';
let currentPlaying = true;
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let opendoor3;
let scores = 0;
let streaks = 0;
// -----------------------------------------------------------

// Changing image for the first time on clicking the doors.
doorImage1.onclick = () => {
  doorImage1.src = botDoorPath;
}
doorImage2.onclick = () => {
  doorImage2.src = beachDoorPath;
}
doorImage3.onclick = () => {
  doorImage3.src = spaceDoorPath;
}
// ------------------------------------------------------------------

// The function for determining whether you open the door in which Bot is Hiding.
const isBot = door => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}
// ---------------------------------------------------------------------------

/*This function is for checking whether the door is closed or not. Or to check that it has
clicked earlier or not.*/
const isClicked = door => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
}
// -----------------------------------------------------------------------

// This is for decreasing number of doors after being clicked and calling a Game Over function to determine results.
const playDoor = (Door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(Door)) {
    gameOver();
  }
}
// -------------------------------------------------------------------------------

// Main function to randomise the Chore Bot hiding behind the doors.
const randomChoreDoorGenerator = () => {
  let choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = beachDoorPath;
  } else if (choreDoor === 1) {
    openDoor1 = spaceDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = botDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  }
}
// -----------------------------------------------------------------

// This is for printing wining or loosing message on basic of results given by Game Over function.
const gameOver = status => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    getYourScore();
  } else {
    startButton.innerHTML = 'Game over! Play again?';
    scores = 0;
    currentStreak.innerHTML = scores;
  }
  currentPlaying = false;
}
// ----------------------------------------------------------------------------

// Changing image for the second time on clicking the doors after randomising.
doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentPlaying === true) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentPlaying === true) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentPlaying === true) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}
// ---------------------------------------------------------------------

// This is for starting new round on clicking Good Luck button.
startButton.onclick = () => {
  if (currentPlaying === false) {
    startRound();
  }
}
// -----------------------------------------------------------------------------

// Resetting values to default before starting a new round.
const startRound = () => {
  numClosedDoors = 3;
  startButton.innerHTML = 'Good Luck!';
  currentPlaying = true;
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  randomChoreDoorGenerator();
}
// --------------------------------------------------------------------

// This function is for printing scores and streaks in the scoreboards.
const getYourScore = () => {
  scores++;
  currentStreak.innerHTML = scores;
  if (scores > streaks) {
    streaks = scores;
    bestStreak.innerHTML = streaks;
  }
}
// --------------------------------------------------------------------------

randomChoreDoorGenerator();
