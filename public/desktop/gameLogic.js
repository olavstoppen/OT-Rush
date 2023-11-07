let gameScore = 0;
const NO_OF_HIGH_SCORES = 10;
const HIGH_SCORES = "highScores";
const highScoreString= "";
const highScores = []
const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;

const scoreText = document.getElementById("currentScore");
const playbutton = document.getElementById("playbutton");

const gameStates = ["startMode", "PlayMode", "GameOver"];
let currentGameStates = gameStates[0];
const gameOverScreen = document.getElementById("game-over-screen");
const board = document.getElementById("character");
const pingu = document.getElementById("pingu");
let boardCollider;

const enemies = document.getElementById("enemies");
let enemyCollider;
let enemySlideSpeed = 0;

const fish = document.getElementById("fish");
let fishCollider;
let fishSlideSpeed = 0;
const backgroundContainer = document.getElementById("background-container");
const treeLine1 = document.getElementById("treeLine1");
const treeLine2 = document.getElementById("treeLine2");
var bgMusic = new Audio("sound/bgmusic.mp3");

let acceleration = 1;

window.onload = () => {
  const customCursor = document.getElementById('custom-cursor');
  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.pageX + 'px';
    customCursor.style.top = e.pageY + 'px';
  });
  showHighScores();

  boardCollider = board.querySelector(".collider");
  enemyCollider = enemies.querySelector(".collider");
  fishCollider = fish.querySelector(".collider");



  document.addEventListener("keydown", (event) => {
    if (event.key === "a") {
      moveLeftGeo(-6); // Move left
    } else if (event.key === "d") {
      moveLeftGeo(6); // Move right
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && currentGameStates == gameStates[2]) {
      // Your code to handle the Enter key press goes here
      gameOver();
    }
  });

  document.addEventListener("keyup", () => {
    // Reset acceleration when keys are released
    acceleration = 1;
    moveLeftGeo(0);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "a" || event.key === "d") {
      // Increase acceleration when keys are held down
      acceleration = 10;
    }
  });
  if (!isMobile()) {
    const socket = io();

    socket.on("mobile orientation", function (e) {
      moveLeftGeo(Math.round(e));
    });
  }
};

const startGame = () => {
  document.getElementById("moonEl").style.animation =
    "moonSlide 61s linear forwards";
  document.getElementById("game").style.animation =
  "skySlide 50s linear forwards";
  scrollBackground();
  currentGameStates = gameStates[1];
  enemySlideDown();
  fishSlideDown();
};
function inRange(x, min, max) {
  return (x - min) * (x - max) <= 0;
}

const moveLeftGeo = (number) => {
  let left = parseInt(window.getComputedStyle(board).getPropertyValue("left"));

  left += number * acceleration;

  if (number > 0) {
    board.style.transform = " rotate(" + number * 3 + "deg)";
    pingu.style.backgroundImage = "url(" + "img/1st.png" + ")";
  } else if (number < 0) {
    board.style.transform = " rotate(" + number * 3 + "deg)";
    pingu.style.backgroundImage = "url(" + "img/3rd.png" + ")";
  } else {
    board.style.transform = " rotate(" + 0 + "deg)";
    pingu.style.backgroundImage = "url(" + "img/2nd.png" + ")";
  }

  if (left >= 15 && left < 419) {
    board.style.left = left + "px";
    pingu.style.left = left + "px";
  }
};

const isMobile = () => {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

function showHighScores() {
  const highScoreString = localStorage.getItem(HIGH_SCORES);
//const highScores = JSON.parse(highScoreString) ?? [];
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const highScoreList = document.getElementById("highScores");

  

  highScoreList.innerHTML = highScores
    .map((score,index) => `<li>${(index + 1) +". "+ score.score} - ${score.name}`)
    .join("");
}

function checkHighScore(score) {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
  if (gameScore > lowestScore) {
    const name = prompt("Game Over, you got a highscore! Enter name:");
    const newScore = { score, name };
    saveHighScore(newScore, highScores);
    showHighScores();
  } else {
    alert("Game Over, no high score for you");
  }
}

function saveHighScore(score, highScores) {
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(NO_OF_HIGH_SCORES);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function showGameOverScreen() {
  gameOverScreen.style.display = "flex";
  backgroundContainer.style.display = "none";
  currentGameStates = gameStates[2];
  fish.remove();
  enemies.remove();
  board.remove();
  bgMusic.pause();

  var audio = new Audio("sound/critical.mp3");
  audio.play();
}

function gameOver() {
  checkHighScore(gameScore);
  gameScore = 0;
  location.reload();
}

var timeleft = 60;
const startGameNow = () => {
  var audio = new Audio("sound/start-game.mp3");
  audio.play();
  var timeIsRunningOutAudio = new Audio("sound/time_running_out2.mp3");;

   var gameTimer = setInterval(function () {
    timeleft--;
    document.getElementById("timer").textContent = "Time: 0" + timeleft;
    if(timeleft <= 10) {
      timeIsRunningOutAudio.play();
    }

    if (timeleft <= 0) {
      timeIsRunningOutAudio.pause();
      clearInterval(gameTimer);
      showGameOverScreen();
    }
  }, 1000);


  audio.addEventListener("ended", function () {
    document.getElementById("playbutton").classList.add("no-display");

    bgMusic.play();
    startGame();

  });
};

function getRandomNumber(min, max) {
  // Use Math.random() to generate a random number between 0 (inclusive) and 1 (exclusive).
  // Then, scale and shift the result to the desired range.
  return Math.random() * (max - min) + min;
}
function enemySlideDown() {
  let topPosition = 20;
  let origScale = 1;

  enemySlideSpeed = 1;

  function animate() {
    topPosition += enemySlideSpeed;
    enemies.style.top = topPosition + "px";

    //enemies.style.transform = "scale(" + parseInt(origScale += scaleSpeed) + "%);"

    const charLeftBound1 =
      parseInt(board.style.left) + parseInt(boardCollider.style.left);
    const charLeftBound2 = charLeftBound1 + parseInt(boardCollider.offsetWidth);
    const charTopBound1 =
      parseInt(board.style.top) + parseInt(boardCollider.style.top);
    const charTopBound2 = charTopBound1 + parseInt(boardCollider.offsetHeight);

    const enemyLeftBound1 =
      parseInt(enemies.style.left) + parseInt(enemyCollider.style.left);
    const enemyLeftBound2 = enemyLeftBound1 + enemyCollider.offsetWidth;
    const enemyTopBound1 =
      parseInt(enemies.style.top) + parseInt(enemyCollider.style.top);
    const enemyTopBound2 =
      enemyTopBound1 + parseInt(enemyCollider.offsetHeight);

    if (
      enemyTopBound2 > charTopBound1 &&
      enemyTopBound1 < charTopBound2 &&
      enemyLeftBound1 < charLeftBound2 &&
      enemyLeftBound2 > charLeftBound1
    ) {
      console.log("Collision detected!");
      showGameOverScreen()
    }

    requestAnimationFrame(animate);

    if (topPosition > 450) {
      topPosition = 40;
      origScale = 1;
      enemySlideSpeed += getRandomNumber(0, 0.08);
      var colors = [
        'url("img/obstacle_1.png")',
        'url("img/obstacle_2.png")',
      ];
      var randomImage = Math.floor(Math.random() * 2) + 0;

      document.getElementById("enemies").style.backgroundImage =
        colors[randomImage];
      var random = getRandomNumber(0, 300);
      left = random;

      enemies.style.left = left + "px";
    }

    //}
  }

  animate(enemies);
}

function fishSlideDown() {
  let topPosition = 40;

  fishSlideSpeed += getRandomNumber(1, 2); // Adjust this value to control the speed of the animation
  let soundPlayed = false;
  var audio = new Audio("sound/coin.mp3");

  function animate() {
    topPosition += fishSlideSpeed;
    fish.style.top = topPosition + "px";

    const charLeftBound1 =
      parseInt(board.style.left) + parseInt(boardCollider.style.left);
    const charLeftBound2 = charLeftBound1 + parseInt(boardCollider.offsetWidth);
    const charTopBound1 =
      parseInt(board.style.top) + parseInt(boardCollider.style.top);
    const charTopBound2 = charTopBound1 + parseInt(boardCollider.offsetHeight);

    const fishLeftBound1 =
      parseInt(fish.style.left) + parseInt(fishCollider.style.left);
    const fishLeftBound2 = fishLeftBound1 + fishCollider.offsetWidth;
    const fishTopBound1 =
      parseInt(fish.style.top) + parseInt(fishCollider.style.top);
    const fishTopBound2 = fishTopBound1 + parseInt(fishCollider.offsetHeight);

    if (
      fishTopBound2 > charTopBound1 &&
      fishTopBound1 < charTopBound2 &&
      fishLeftBound1 < charLeftBound2 &&
      fishLeftBound2 > charLeftBound1
    ) {
      console.log("give points");
      gameScore = gameScore + 1;
      scoreText.innerText = "Score: 0000000000" + gameScore;

      if (!soundPlayed) {
        audio.play();
        soundPlayed = true;
    }

    soundPlayed = false;

    }

    requestAnimationFrame(animate);

    if (topPosition > 450) {
      topPosition = 40;
      console.log(fishSlideSpeed);

      fishSlideSpeed += getRandomNumber(0, 0.1);
      var random = getRandomNumber(0, 300);
      left = random;

      fish.style.left = left + "px";
    }

    //}
  }

  animate();
}

function scrollBackground() {
  function animate() {
    let currentBgYPosition = parseInt(
      getComputedStyle(backgroundContainer).backgroundPositionY
    );
    let currentBgXPosition1 = parseInt(
      getComputedStyle(treeLine1).backgroundPositionX
    );
    let currentBgXPosition2 = parseInt(
      getComputedStyle(treeLine2).backgroundPositionX
    );
    currentBgYPosition++;
    currentBgXPosition1++;
    currentBgXPosition2--;
    backgroundContainer.style.backgroundPositionY = currentBgYPosition + "px";
    treeLine1.style.backgroundPositionX = currentBgXPosition1 + "px";
    treeLine2.style.backgroundPositionX = currentBgXPosition2 + "px";
    requestAnimationFrame(scrollBackground);
  }

  animate();
}
