// branch in main

//Show cards from existing divs (pictures)
// create three cards (back and front)
// three picture : sun - rain - snow

// Show the cards in front
// flip cards in back
// mix thouse cards

// add click to the each card
// turn (flip) the card

// if it is the right card is The Sun card --> 1 point

/*------------------------------------------------
 CREATE PLAYER AND SAVE IN LEADERBOARD
------------------------------------------------*/
// Get HTML elements for player form, select, input, and leaderboard
let playerFormEl = document.querySelector("#playerName");
let playerIconsEl = document.querySelector("#playerIcons");
let inputPlayerEl = document.querySelector(".input-player");
let playerInfo = {};
let leaderBoardEl = document.querySelector("#leaderBoard");

// Function to retrieve player information from the form
function getPlayer() {
  // Extract player information from the form elements
  playerInfo = {
    // Get the icon for the corresponding options in the HTML (sunglasses, ghost etc.)
    icons: playerIconsEl.querySelector(`option[value=${playerIconsEl.value}]`)
      .textContent,
    name: inputPlayerEl.value,
    score: 0,
  };
  return playerInfo;
}

let resetEl = document.querySelector(".button-start");
resetEl.addEventListener("click", function () {
  location.reload();
});

// Event listener for player form submission
playerFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  getPlayer(); // Get player info
  playerFormEl.classList.add("hide-input"); // Hide the player input form
});

// Function to retrieve leaderboard data from local storage
function getLeaderboard() {
  let players = [];

  if (localStorage.getItem("players")) {
    // Use try-catch to prevent crashes if local storage data is not valid JSON
    try {
      const playersInLocalStorage = JSON.parse(localStorage.getItem("players"));

      // Check if the data in local storage is an array
      if (Array.isArray(playersInLocalStorage)) {
        players = playersInLocalStorage;
      }
    } catch (err) {}
  }
  return players;
}

// Function to save player's score to the leaderboard in local storage
function savePlayerScore() {
  playerInfo.score = points; // Assuming 'points' is a global variable
  let players = getLeaderboard();

  // Add the current player's info to the leaderboard
  players.push(playerInfo);
  localStorage.setItem("players", JSON.stringify(players));
}

// Function to display the leaderboard on the webpage
function showLeaderBoard() {
  // Retrieve players from the leaderboard
  let playersArray = getLeaderboard();

  // Sort players by score in descending order
  playersArray.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else if (a.score > b.score) {
      return -1;
    } else {
      return 0;
    }
  });

  // Limit the displayed players to 4
  playersArray = playersArray.slice(0, 10);
  console.log("playersArray", playersArray);

  // Clear the existing leaderboard content
  leaderBoardEl.innerHTML = "";

  // Iterate through the player data and create HTML elements to display on the leaderboard
  for (let player of playersArray) {
    /*  non fare cosi perchÃ¨ https://owasp.org/www-community/attacks/xss/
    const li = `<li><span class="icon">${player.icons}</span><span class="name">${player.name}</span><span class="score">${player.score}</span></li>`;
    leaderBoardEl.innerHTML += li; */

    // Create li element for each player
    const li = document.createElement("li");
    // Create span element for player icon
    const spanIcon = document.createElement("span");
    spanIcon.textContent = player.icons;
    spanIcon.className = "leaderBoard-icon";
    li.appendChild(spanIcon);

    // Create span element for player name
    const spanName = document.createElement("span");
    spanName.textContent = player.name;
    spanName.className = "leaderBoard-name";
    li.appendChild(spanName);

    // Create span element for player score
    const spanScore = document.createElement("span");
    spanScore.textContent = player.score;
    spanScore.className = "leaderBoard-score";
    li.appendChild(spanScore);

    // Append the li element to the leaderboard
    leaderBoardEl.appendChild(li);
  }
}

//------------------------------------------------
// Here we get the id from each card div and assign it to a
// respective element.

showLeaderBoard(); // This line is added to display the leaderboard before the game starts
// When we have set up the event listners for the cards, we
// start the main game loop:

showLeaderBoard(); // // This line is added to display the leaderboard with the new player

let points = 0;
let roundsPlayed = 0;
let maxRounds = 5;

let cards = [0, 1, 2];

let cardEls = document.querySelectorAll(".card");

let correctEl = document.querySelector(".card--red");
correctEl.addEventListener("click", function () {
  if (roundsPlayed === maxRounds) {
    location.reload();
  } else {
    roundsPlayed += 1;
    points += 1;
    console.log("Correct");
    console.log(`Rounds played: ${roundsPlayed}`);
    console.log(`Points: ${points}`);
    playRound();
  }
});

let falseElBlue = document.querySelector(".card--blue");
falseElBlue.addEventListener("click", function () {
  falseCard();
});

let falseElGreen = document.querySelector(".card--green");
falseElGreen.addEventListener("click", function () {
  falseCard();
});

function falseCard() {
  if (roundsPlayed === maxRounds) {
    location.reload();
  } else {
    console.log("Wrong");
    roundsPlayed += 1;
    console.log(`Rounds played: ${roundsPlayed} of ${maxRounds}`);
    console.log(`Points: ${points}`);
    playRound();
  }
}

function shuffleCards() {
  let cardShuffle;
  do {
    cardShuffle = cards.slice().sort(() => Math.random() - 0.5);
  } while (arraysEqual(cards, cardShuffle));

  cards = cardShuffle;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const cardEl = cardEls[card];

    cardEl.style.zIndex = Math.ceil(Math.random() * 5) + 1;
    cardEl.style.translate = `${200 * i}px`;
  }
}

shuffleCards();

function playRound() {
  for (let cardEl of cardEls) {
    //cardEl.classList.add("card--flipped");
  }

  let count = 0;
  let interval = setInterval(function () {
    shuffleCards();
    count += 1;

    // Exit interval
    if (count === 10) {
      clearInterval(interval);
    }
  }, 400);
}

setTimeout(function () {
  playRound();
}, 1500);

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

/* - - - - - - - - - - - - - - - - -
  "Flip the card" functionality:
 - - - - - - - - - - - - - - - - - - */
const cardsEl = document.querySelectorAll(".card");

cardsEl.forEach(function (card) {
  card.addEventListener("click", flipCard);
});

function flipCard(e) {
  const clickedCard = e.currentTarget;
  clickedCard.classList.toggle("flipCard");
}
