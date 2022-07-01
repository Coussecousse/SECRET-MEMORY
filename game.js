const cards         = document.querySelectorAll('.cards');
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
    card.addEventListener('click', () => {
        //  Retourne la carte
        let front = card.querySelector('.front');
        let back  = card.querySelector('.back');

        front.classList.add('flipper-front-on');
        back.classList.add('flipper-back-on');
        //Verification des cartes:
        //Récupérer le nom de la data
        VerifierCartes(card);
    })
})
function VerifierCartes(card){
    listCards.push(card);
    listCards[0].dataset.number = "one";
    console.log(listCards)
    if (listCards.length == 2) {
        //  Si on appuie deux fois sur la même carte :
        if (listCards[1].dataset.number == "one") {
            listCards.pop();
        } else {
            let firstCard  = listCards[0];
            let secondCard = listCards[1];
            if (firstCard.dataset.animal === secondCard.dataset.animal) {
                console.log("je passe ici")
                //Carte en vert
                //Remettre vide listCards
            } else {
                //Carte en rouge, petite animation de droite à gauche
                //Retourner les deux cartes 
                console.log("Je passe ici2")
                listCards.forEach(card => {
                    let front = card.querySelector('.front');
                    let back  = card.querySelector('.back');
                    setTimeout(TurnCards, 1000,front, back);
                })
            listCards = [];
        }
        console.log("Après le retournement" + listCards);
        }
    }
}

function TurnCards(front, back){
    front.classList.remove('flipper-front-on');
    back.classList.remove('flipper-back-on');
    front.classList.add('flipper-front-off');
    back.classList.add('flipper-back-off');
}

function getFrontAndBack(card){
    let front = card.querySelector('.front');
    let back  = card.querySelector('.back');
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