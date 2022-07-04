let cards         = document.querySelectorAll('.cards');
const ocean         = ['Hyppocampe', 'Hyppocampe', 'Poisson Clown','Poisson Clown', 'Pieuvre', 'Pieuvre', 'Requin', 'Requin', 'Baleine', 'Baleine','Tortue', 'Tortue'];
const savane        = ['Lion', 'Lion', 'Girafe', 'Girafe', 'Zèbre', 'Zèbre', 'Éléphant', 'Éléphant', 'Chimpanzé', 'Chimpanzé', 'Hippopotame', 'Hippopotame'];
const ferme         = ['Vache', 'Vache', 'Poule', 'Poule', 'Chien', 'Chien', 'Mouton', 'Mouton', 'Cochon', 'Cochon', 'Cheval', 'Cheval']
const themes        = [ocean, savane, ferme];

let listCards       = [];
let counter       = 0;
//____________1__________Distribution des cartes au tout début :
CardsDistribution();

//____________2__________Cartes qui se retournent :
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        // Prend les cartes
        GetCards(card);
        if (listCards.length <= 2 && !card.classList.contains('valid')){
            console.log('je passe ici');
            TurnCards(card);
            if (listCards.length == 2){
                VerifierCartes();
            }
        }
    })
})
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
            setTimeout(TurnCards, 1000,card);
        })
    }
    //Empêche de pouvoir tourner d'autres cartes:
    setTimeout(() => {
        firstCard.dataset.number = ""
        listCards = [];
    }, 900);
}
    // return true;

function TurnCards(card){
    let front = card.querySelector('.front');
    let back  = card.querySelector('.back');
    if (front.classList.contains('flipper-front-off')){
        // Passer le front devant
        replaceFlippCards(front, back, 'on', 'off');
    } else if (front.classList.contains('flipper-front-on')){
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

function SelectTheme() {
    return Math.floor(Math.random() * (themes.length));
}

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
//_____2_____
//Une liste avec le nom des animaux -> 6 paires d'animaux. Exemple liste ['girafe', 'girafe', 'zèbre', 'zèbre'] -> A chaque fois deux fois les animaux
//Prendre les cartes une par une et tirer au sort dans la liste le nom de l'animal inscrit sur la carte puis enlève l'animal de la liste 
//Ajouter le nom de l'animal tiré au sort et le mettre sur la carte selectionnée (en data-animal ?)

//_____3_____
//Quand on clique, le nom est affiché. Ajoute 1 au compteur. 
//Si la deuxième carte tirée n'est pas la même, alors compteur revient à 1. 
//La carte devient rouge, fait une animation de droite à gauche et se retourne en front
//Si la carte est la même, la carte devient verte et reste en back et on ne peut plus appuyer dessus

//_____4_____
//Lancer le timer dès que la première carte est retournée 
//Si le compteur arrive à 0, c'est perdu, toutes les cartes se retournent et on peut juste appuyer sur rejouer

//____5_____
//Si le jeu est gagné, le timer est arrêté, "BRAVO" s'affiche, et on peut juste appuyer sur rejouer

//____6_____
//Fonction rejouer