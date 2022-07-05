let cards         = document.querySelectorAll('.cards');
//_____1_____
//Une liste avec le nom des animaux -> 6 paires d'animaux. Exemple liste ['girafe', 'girafe', 'zèbre', 'zèbre'] -> A chaque fois deux fois les animaux
//Prendre les cartes une par une et tirer au sort dans la liste le nom de l'animal inscrit sur la carte puis enlève l'animal de la liste 
//Ajouter le nom de l'animal tiré au sort et le mettre sur la carte selectionnée (en data-animal ?)
const ocean         = ['Hyppocampe', 'Hyppocampe', 'Poisson Clown','Poisson Clown', 'Pieuvre', 'Pieuvre', 'Requin', 'Requin', 'Baleine', 'Baleine','Tortue', 'Tortue'];
const savane        = ['Lion', 'Lion', 'Girafe', 'Girafe', 'Zèbre', 'Zèbre', 'Éléphant', 'Éléphant', 'Chimpanzé', 'Chimpanzé', 'Hippopotame', 'Hippopotame'];
const ferme         = ['Vache', 'Vache', 'Poule', 'Poule', 'Chien', 'Chien', 'Mouton', 'Mouton', 'Cochon', 'Cochon', 'Cheval', 'Cheval']
const themes        = [ocean, savane, ferme];

let firstCardClick  = true;
let returnedCards   = 0;
let timerInterval;

let listCards       = [];
let counter         = 60;
const timer         = document.querySelector('.timer__counter');
const timerProgress = document.querySelector('.progress-bar');
//____________2__________Distribution des cartes au tout début :
CardsDistribution();

function CardsDistribution() {
    let theme = SelectTheme();
    theme     = themes[theme];
    let cloneTheme   = [...theme];
    cards.forEach(card => {
        let index           = Math.floor(Math.random() * (cloneTheme.length));
        let back            = card.querySelector('.back');
        back.innerText      = cloneTheme[index];
        card.dataset.animal = cloneTheme[index];
        cloneTheme.splice(index, 1);
    })
}
function SelectTheme() {
    return Math.floor(Math.random() * (themes.length));
}

//____________3__________Cartes qui se retournent :
//_____3_____
//Rentre la carte sélectionnée dans une liste pour qu'il n'y en ai que 2 maximums. 
//S'il y a moins de 2 cartes dans la liste, alors les cartes sont retournées
//Inspecte si les deux cartes sont les mêmes, si non, les retournent
//La carte devient rouge, fait une animation de droite à gauche et se retourne en front
//Si la carte est la même, la carte devient verte et reste en back et on ne peut plus appuyer dessus
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prend les cartes
        if (firstCardClick){
            timerOn();
            firstCardClick = false;
        }
        // Lance le timer : 
        GetCards(card);
        if (listCards.length <= 2 && !card.classList.contains('valid') && !card.children[0].classList.contains('flipper-front-on')){
            turnCards(card);
            if (listCards.length == 2){
                VerifierCartes();
            }
        }
        //Verifier si toutes les cartes sont retournées et valider :
        gameStatus();
    })
})
function timerOn(){
    timerProgress.classList.add('timer-on');
    timerInterval = setInterval(lessCounter, 1000);
}

function gameStatus(){
    cards.forEach(card => {
        if (card.children[0].classList.contains('flipper-front-on')){
            returnedCards++;
        }
    })
    if (returnedCards == cards.length){
        clearInterval(timerInterval);
        let currentWidthOfProgressBar = timerProgress.clientWidth;
        timerProgress.style.width = currentWidthOfProgressBar+'px';
        timerProgress.classList.remove('timer-on');
        setTimeout(winOrLose,800,'Bravo !');
    } else {
        returnedCards = 0;
    }
}

function lessCounter() {
    if (counter == 0){
        winOrLose('Perdu !');
        clearInterval(timerInterval);
        cards.forEach(card => {
            turnCards(card);
        })
    } else {    
        counter--;
        timer.innerText = counter+'s';
    }
}
function GetCards(card){
    if (listCards.length <= 2 && !card.classList.contains('valid')) {
        listCards.push(card);
        listCards[0].dataset.number = "one";
    }
    if (listCards.length == 2){
        if (listCards[1].dataset.number == "one"){
            listCards.pop();
        }
    }
}
function VerifierCartes(){
    let firstCard  = listCards[0];
    let secondCard = listCards[1];
    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        listCards.forEach(card => {
            //  Animation carte bonne :
            setTimeout(()=> {card.classList.add('valid')}, 500);
            // Bordure ajoutée :
            setTimeout(() => {card.children[1].classList.add("border", "border-success", "border-2");}, 800);
        })
    } else {
        firstCard.dataset.number = "";
        listCards.forEach(card => {
            // Animation mauvaise carte :
            setTimeout(()=> {
                card.classList.add('unvalid')
                card.children[1].classList.add('border', 'border-danger', 'border-2');
            }, 500);

            // Retourner les cartes : 
            setTimeout(turnCards, 1000,card);
        })
    }
    //Empêche de pouvoir tourner d'autres cartes:
    setTimeout(() => {
        firstCard.dataset.number = ""
        listCards = [];
    }, 900);
}

function turnCards(card){
    let front = card.querySelector('.front');
    let back  = card.querySelector('.back');
    if (front.classList.contains('flipper-front-off')){
        // Passer le front devant
        replaceFlippCards(front, back, 'on', 'off');
    } else if (front.classList.contains('flipper-front-on') && !card.classList.contains('valid')){
        // Si est en position front (pour passer le back devant)
        replaceFlippCards(front, back, 'off', 'on');
        //Enlever l'animation et les bordures :
        card.classList.remove('unvalid');
        back.classList.remove('border', 'border-danger', 'border-2');
    } else {
        // Si c'est la première fois que les cartes sont retournées donc il n'y a pas de flipper-front-off sur les cartes : 
        addFlippCards(front, back, 'on');
    }
}
function replaceFlippCards(front, back, add, remove){
    front.classList.replace(('flipper-front-'+remove), ('flipper-front-'+add));
    back.classList.replace(('flipper-back-'+remove), ('flipper-back-'+add));
}
function addFlippCards(front, back, add){
    front.classList.add(('flipper-front-'+add));
    back.classList.add('flipper-back-'+add);
}

function winOrLose(text){
    const div = document.createElement('div');
    const main = document.querySelector('main');

    div.classList.add('winOrLose','rounded', 'bg-white', 'fs-1', 'd-flex', 'justify-content-center', 'align-items-center', 'position-absolute', 'top-50', 'start-50', 'translate-middle');
    div.style.width = '300px';
    div.style.height = '200px';
    div.textContent = text;
    if (text == 'Perdu !'){
        div.classList.add('text-danger');
    } else {
        div.classList.add('text-success');
    }
    main.append(div);
}


//_____4_____
//Lancer le timer dès que la première carte est retournée 
//Si le compteur arrive à 0, c'est perdu, toutes les cartes se retournent et on peut juste appuyer sur rejouer



//____5_____
//Si le jeu est gagné, le timer est arrêté, "BRAVO" s'affiche, et on peut juste appuyer sur rejouer

//____6_____
//Fonction rejouer

const playAgain = document.querySelector('#play-again');

playAgain.addEventListener('click', () => {
    playAgainFunction();
})

function playAgainFunction() {
    CardsDistribution();
}

