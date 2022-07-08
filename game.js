let cards = document.querySelectorAll(".cards");
//_____ETAPE 1_____
// Une liste avec le nom des animaux -> 6 paires d'animaux. Exemple liste ['girafe', 'girafe', 'zèbre', 'zèbre'] -> A chaque fois deux fois les animaux
// Prendre les cartes une par une et tirer au sort dans la liste le nom de l'animal inscrit sur la carte puis enlève l'animal de la liste
// Ajouter le nom de l'animal tiré au sort et le mettre sur la carte selectionnée (en data-animal ?)

// THEME
const ocean = [
  "Hyppocampe",
  "Hyppocampe",
  "Poisson Clown",
  "Poisson Clown",
  "Pieuvre",
  "Pieuvre",
  "Requin",
  "Requin",
  "Baleine",
  "Baleine",
  "Tortue",
  "Tortue",
];
const savane = [
  "Lion",
  "Lion",
  "Girafe",
  "Girafe",
  "Zèbre",
  "Zèbre",
  "Éléphant",
  "Éléphant",
  "Chimpanzé",
  "Chimpanzé",
  "Hippopotame",
  "Hippopotame",
];
const ferme = [
  "Vache",
  "Vache",
  "Poule",
  "Poule",
  "Chien",
  "Chien",
  "Mouton",
  "Mouton",
  "Cochon",
  "Cochon",
  "Cheval",
  "Cheval",
];
const themes = [ocean, savane, ferme];
let theme;

// TURN CARDS
let listCards = [];
let firstCardClick = true;
let returnedCards = 0;

// TIMER
let timerInterval;
let counter = 60;
const timer = document.querySelector(".timer__number");
const timerProgress = document.querySelector(".progress-bar");

// WIN OR LOSE
const div = document.createElement("div");
const main = document.querySelector("main");

//____________ETAPE 2__________
// Distribution des cartes au tout début :
CardsDistribution();
timer.textContent = counter + "s";

function CardsDistribution() {
  if (theme == undefined) {
    theme = SelectTheme();
    theme = themes[theme];
  } else {
    let newTheme;
    do {
      newTheme = SelectTheme();
      newTheme = themes[newTheme]
    } while (newTheme == theme);
    theme = newTheme;
  }
  let cloneTheme = [...theme];
  cards.forEach((card) => {
    let index = Math.floor(Math.random() * cloneTheme.length);
    let back = card.querySelector(".back");
    back.innerText = cloneTheme[index];
    card.dataset.animal = cloneTheme[index];
    cloneTheme.splice(index, 1);
  });
}
function SelectTheme() {
  return Math.floor(Math.random() * themes.length);
}
//_____ETAPE 3_______
//Lancer le timer dès que la première carte est retournée
//Si le compteur arrive à 0, c'est perdu, toutes les cartes se retournent et on peut juste appuyer sur rejouer

//____________ETAPE 3__________
// Cartes qui se retournent :
//_____3_____
// Rentre la carte sélectionnée dans une liste pour qu'il n'y en ai que 2 maximum.
// S'il y a moins de 2 cartes dans la liste, alors les cartes sont retournées
// Inspecte si les deux cartes sont les mêmes, si non, les retournent
// La carte devient rouge, fait une animation de droite à gauche et se retourne en front
// Si la carte est la même, la carte devient verte et reste en back et on ne peut plus appuyer dessus
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    // Vérifie si c'est la première carte retournée pour lancer le timer
    if (firstCardClick) {
      timerOn();
      firstCardClick = false;
    }
    // Récupère les cartes dans une liste
    GetCards(card);
    if (
      listCards.length <= 2 &&
      !card.classList.contains("valid") &&
      !card.classList.contains("rotate-on")
      && counter > 0
    ) {
      turnCards(card);
      if (listCards.length == 2) {
        verifyCards();
      }
    }
    //_______ETAPE 4 ________
    //Verifier si toutes les cartes sont retournées :
    if (counter > 0){
      gameStatus();
    }
  });
});
// Lance le timer:
function timerOn() {
  timerProgress.classList.add("timer-on");
  timerInterval = setInterval(lessCounter, 1000);
}
// Enlève 1 au compteur et l'affiche
function lessCounter() {
  if (counter == 0) {
    // Si le timer est à 0, le jeu est perdu:
    winOrLose("Perdu !");
    clearInterval(timerInterval);
    cards.forEach((card) => 
    setTimeout(()=> {
      if (!card.children[0].classList.contains("flipper-front-on")) {
        turnCards(card);
        }
      },200))
  } else {
    counter--;
    timer.innerText = counter + "s";
  }
}

// Récupère les cartes:
function GetCards(card) {
  if (listCards.length <= 2 && !card.classList.contains("valid")) {
    listCards.push(card);
    listCards[0].dataset.number = "one";
  }
  if (listCards.length == 2) {
    if (listCards[1].dataset.number == "one") {
      listCards.pop();
    }
  }
}

// Tourne les cartes :
function turnCards(card) {
  if (card.classList.contains("rotate-off")) {
    // Passer le front devant:
    card.classList.replace('rotate-off', 'rotate-on');
  } else if (
    card.classList.contains("rotate-on") &&
    !card.classList.contains("valid")
  ) {
    // Si carte en position front (pour passer le back devant)
    card.classList.replace('rotate-on', 'rotate-off');
    //Enlever l'animation et les bordures :
    card.classList.remove("unvalid");
    back.classList.remove("border", "border-danger", "border-2");
  } else {
    // Si c'est la première fois que les cartes sont retournées donc il n'y a pas de flipper-front-off sur les cartes :
    card.classList.add('rotate-on');
  }
}

// Vérifie si les cartes sont les mêmes:
function verifyCards() {
  let firstCard = listCards[0];
  let secondCard = listCards[1];
  if (firstCard.dataset.animal === secondCard.dataset.animal) {
    listCards.forEach((card) => {
      //  Animation carte bonne :
      setTimeout(() => {
        card.classList.add("valid");
      }, 500);
      // Bordure ajoutée :
      setTimeout(() => {
        card.children[1].classList.add("border", "border-success", "border-2");
      }, 800);
    });
  } else {
    firstCard.dataset.number = "";
    listCards.forEach((card) => {
      // Animation mauvaise carte :
      setTimeout(() => {
        card.classList.add("unvalid");
        card.children[1].classList.add("border", "border-danger", "border-2");
      }, 500);

      // Retourner les cartes :
      setTimeout(turnCards, 1000, card);
    });
  }
  //Remet la liste des cartes à zero, permettant de tourner à nouveau d'autres cartes:
  setTimeout(() => {
    firstCard.dataset.number = "";
    listCards = [];
  }, 900);
}

// Vérifie le jeu:
function gameStatus() {
  cards.forEach((card) => {
    // Compte le nombre de cartes retournées (donc valides):
    if (card.classList.contains("rotate-on")) {
      returnedCards++;
    }
  });
  if (returnedCards == cards.length) {
    // Si il y a autant de cartes retournées alors le jeu est gagné:
    clearInterval(timerInterval);
    let currentWidthProgressBar = timerProgress.clientWidth;
    timerProgress.style.width = currentWidthProgressBar + "px";
    timerProgress.classList.remove("timer-on");
    setTimeout(winOrLose, 800, "Bravo !");
  } else {
    returnedCards = 0;
  }
}

// Ajoute la popup de win ou lose, arrête le timer :
function winOrLose(text) {
  div.classList.add(
    "winOrLose",
    "rounded",
    "bg-white",
    "fs-1",
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "position-absolute",
    "top-50",
    "start-50",
    "translate-middle",
    "text-success"
  );
  div.style.width = "300px";
  div.style.height = "200px";
  div.textContent = text;
  if (text == "Perdu !") {
    div.classList.replace("text-success", "text-danger");
  }
  main.append(div);
}

//____ETAPE 5_____
//Fonction rejouer

const playAgain = document.querySelector("#play-again");

playAgain.addEventListener("click", () => {
  playAgainFunction();
});

function playAgainFunction() {
  setTimeout(CardsDistribution, 800);
  cards.forEach((card) => {
    let front = card.children[0];
    let back = card.children[1];
    if (!card.classList.contains("rotate-off")) {
      card.classList.replace('rotate-on', 'rotate-off')
      card.classList.remove("valid");
      back.classList.remove("border", "border-success", "border-2");
    }
  });
  resetVar();
}
function resetVar() {
  clearInterval(timerInterval);
  listCards = [];
  firstCardClick = true;
  if (difficulty.classList.contains("easy")) {
    counter = 60;
  } else {
    counter = 30;
  }
  timer.textContent = counter + "s";
  timerProgress.style.width = "100%";
  timerProgress.classList.remove("timer-on");
  div.remove();
}

// ETAPE BONUS :
// Ajouter un niveau de difficulté

const difficulty = document.querySelector("#difficulty");

difficulty.addEventListener("click", () => {
  // On ne peut pas changer le temps si le jeu est lancé
  if (counter == 60 || counter == 30) {
    if (difficulty.classList.contains("easy")) {
      counter = 30;
      timer.textContent = counter + "s";
      difficulty.classList.replace("easy", "difficult");
      document.documentElement.style.setProperty("--timer", "30s");
    } else {
      counter = 60;
      timer.textContent = counter + "s";
      difficulty.classList.replace("difficul", "easy");
      document.documentElement.style.setProperty("--timer", "60s");
    }
  }
});
