const cards         = document.querySelectorAll('.cards');
const themes        = [ocean, savane, ferme];
const ocean         = ['Hyppocampe', 'Hyppocampe', 'Poisson Clown','Poisson Clown', 'Pieuvre', 'Pieuvre', 'Requin', 'Requin', 'Baleine', 'Baleine','Tortue', 'Tortue'];
const savane        = ['Lion', 'Lion', 'Girafe', 'Girafe', 'Zèbre', 'Zèbre', 'Éléphant', 'Éléphant', 'Chimpanzé', 'Chimpanzé', 'Hippopotame', 'Hippopotame'];
const ferme         = ['Vache', 'Vache', 'Poule', 'Poule', 'Chien', 'Chien', 'Mouton', 'Mouton', 'Cochon', 'Cochon', 'Cheval', 'Cheval']
//Ce que je dois faire : 
//_____1_____
//Un event listener sur les cards. Quand ça clique : 
//Retourne la carte 
cards.forEach(card => {
    card.addEventListener('click', () => {
        //  Retourne la carte
        let front = card.querySelector('.front');
        let back  = card.querySelector('.back');
        front.classList.add('flipper-front');
        back.classList.add('flipper-back');
    })
})
function SelectTheme() {
    return
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