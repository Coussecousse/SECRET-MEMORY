//Bienvenue ici. Je préfère vous prévenir, ça part un peu dans tous les sens
//En plus je ne commente jamais mon code. Je sais c'est une mauvaise habitude
//Même moi je me perds dans mes idées, c'est pour dire !
//Bref, peut être qu'un jour je modifierais en quelque chose de propre
//En attendant bienvenue dans le labyrinthe de mon Javascript !



const nav__menu = document.querySelector(".nav__menu");
const hiddenMenu = document.querySelector(".mobile-nav-hidden");

// menu________________________
nav__menu.addEventListener("click", (e) => {
  const selectedBtn = e.target.closest("button");

  if (!selectedBtn) return;

  if (selectedBtn == nav__menu.children[0]) {
    const notSelectedBtn = nav__menu.children[1];
    changeActiveButton(selectedBtn, notSelectedBtn);
    hiddenMenu.classList.remove("mobile-nav-hidden");
    hiddenMenu.classList.add("mobile-nav-not-hidden");
  } else {
    const notSelectedBtn = nav__menu.children[0];
    changeActiveButton(selectedBtn, notSelectedBtn);
    hiddenMenu.classList.remove("mobile-nav-not-hidden");
    hiddenMenu.classList.add("mobile-nav-hidden");
  }
});

function changeActiveButton(selectedBtn, notSelectedBtn) {
  selectedBtn.classList.remove("btn-active");
  selectedBtn.classList.add("btn-desactive");
  notSelectedBtn.classList.remove("btn-desactive");
  notSelectedBtn.classList.add("btn-active");
}

//Quand j'appuie sur mon boutton, le menu s'ouvre et le bouton change.
//Quand ça scroll je veux que le menu reste en haut

//Quand je clique sur gauche donne le slide avant
//Quand je clique sur droite ddonne slide apres
//quand je clique sur boutons donne slide correspondant

// carousel____________________
const carouselNavigation = document.querySelector(".carousel__sliders");
const carouselImg = document.querySelector(".carousel__imgs");
const divBtn = document.querySelector(".slider__btn");

carouselNavigation.addEventListener("click", (e) => {
  const selectionnedSlide = e.target.closest(".slide");

  if (!selectionnedSlide) return;

  if (
    selectionnedSlide == carouselNavigation.children[0] ||
    selectionnedSlide == carouselNavigation.children[2]
  ) {
    const firstChild = carouselImg.children[0];
    const middleChild = carouselImg.children[1];
    if (selectionnedSlide == carouselNavigation.children[0]) {
      removeAppendChild(firstChild);
      removeAppendChild(middleChild);
      addActiveClass(carouselImg.children[0]);
    } else {
      removeAppendChild(firstChild);
      addActiveClass(carouselImg.children[0]);
    }
  } else {
    const firstImg = document.querySelector(".first_img");
    const middleImg = document.querySelector(".middle_img");
    const lastImg = document.querySelector(".last_img");

    if (selectionnedSlide == divBtn.children[0]) {
      resetChild(middleImg, lastImg);
      order(middleImg, lastImg);
      addActiveClass(carouselImg.children[0]);
    } else if (selectionnedSlide == divBtn.children[1]) {
      resetChild(firstImg, lastImg);
      order(lastImg, firstImg);
      addActiveClass(carouselImg.children[0]);
    } else {
      resetChild(firstImg, middleImg);
      order(firstImg, middleImg);
      addActiveClass(carouselImg.children[0]);
    }
  }
});
//fonction qui enlève et rajoute les enfants
function removeAppendChild(element) {
  carouselImg.removeChild(element);
  carouselImg.appendChild(element);
}
//Reset tous les enfants sauf celui qui doit être le premier
function resetChild(one, two) {
  carouselImg.removeChild(one);
  carouselImg.removeChild(two);
}
//remet tous les enfants à la suite du premier
function order(one, two) {
  carouselImg.appendChild(one);
  carouselImg.appendChild(two);
}
//enlève la class active à toutes les img
function removeActive(childrens, removeingClass) {
  for (let i = 0; i < childrens.length; i++) {
    if (childrens[i].classList.contains(removeingClass)) {
      childrens[i].classList.remove(removeingClass);
    }
  }
}
//ajoute la class current img à la première img avec le btn qui s'active en plus
function addActiveClass(firstChild) {
  removeActive(carouselImg.children, "current_img");
  firstChild.classList.add("current_img");
  removeActive(divBtn.children, "slider__active");
  if (firstChild.classList.contains("first_img")) {
    divBtn.children[0].classList.add("slider__active");
  } else if (firstChild.classList.contains("middle_img")) {
    divBtn.children[1].classList.add("slider__active");
  } else {
    divBtn.children[2].classList.add("slider__active");
  }
}
//GROUP PRESENTATIONS PHOTOS
const figures = document.querySelectorAll(".group__figure");
const figureS = Array.from(figures);
figureS.forEach((element) => {
  element.addEventListener("click", (e) => {
    const selectionnedText = element.querySelector(".figure__wrap-text");
    if (selectionnedText.classList.contains("figure__text-leaving")) {
      selectionnedText.classList.remove("figure__text-leaving");
      selectionnedText.classList.add("figure__text-coming");
    } else {
      selectionnedText.classList.remove("figure__text-coming");
      selectionnedText.classList.add("figure__text-leaving");
    }
  });
});

// ACTIVE MENU
const navBtn = document.querySelector(".nav__menu");
const navMenu = document.querySelector("nav");
const headerContainer = document.querySelector(".container");
const header = document.querySelector("header");

if (window.matchMedia("(max-width: 767px)").matches) {
  navMenu.remove();
  navBtn.remove();

  headerContainer.append(navBtn);
  header.append(navMenu);
  const ul = navMenu.children[0];
  ul.classList.add("mobile-nav-hidden");
  ul.classList.remove("ul-mobile-not");
  ul.classList.add("ul-mobile");
} else {
  navMenu.remove();
  navBtn.remove();

  headerContainer.append(navMenu);
  navMenu.children[0].classList.remove("mobile-nav-hidden");
}
// CLICK MENU AND ACTIVE MENU

let section = document.querySelectorAll("section");
let aList = document.querySelectorAll(".nav_a");

activeLink(aList[0]); //Met l'active à première section

function activeLink(a) {
  aList.forEach((item) => item.classList.remove("active"));
  a.classList.add("active");
}
aList.forEach((item) => {
  item.addEventListener("click", function () {
    //dès qu'on clique, met le active
    activeLink(this);
  });
});
//change l'active en fonction de la position de l'élément par rapport au top
//de la page et de sa taille
window.onscroll = () => {
  section.forEach((sec) => {
    let top = window.scrollY + 200; //obligé de rajouter pour dernière section
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;

    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      const target = document.querySelector(`[href='#${id}']`);
      activeLink(target);
    }
  });
};

//Cette fonction récupère un sélecteur qu'il va transformer en l'élément et les options à appliquer s'il y en a. Pour chaque élément elle va appliquer addObserver
function scrollTrigger(selector, options = {}) {
  let elements = document.querySelectorAll(selector);
  elements = Array.from(elements);
  elements.forEach((element) => {
    addObserver(element, options);
  });
}
function addObserver(element, options) {
  //S'il n'y a pas l'api dans le navigateur les éléments vont s'afficher normalement
  if (!("IntersectionObserver" in window)) {
    if (element.classList.contains("quote__left")) {
      entry.target.classList.add("quote__left-animate");
    } else {
      entry.target.classList.add("quote__right-animate");
    }
    return;
  }
  //IntersectionObserver prend une entrée et son observer. On met l'observer sur chaque élément qui arrive puis on l'enlève
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (element.classList.contains("quote__left")) {
          entry.target.classList.add("quote__left-animate");
        } else {
          entry.target.classList.add("quote__right-animate");
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);
  observer.observe(element);
}
scrollTrigger(".quote", {
  rootMargin: "-50px",
  treshold: 1.0,
});

//On fait les dates ici avec le compteur

const dateLille = new Date(2022, 7, 26, 20, 0, 0);
const dateParis = new Date(2022, 8, 9, 20, 0, 0);
const dateLyon = new Date(2022, 8, 16, 20, 0, 0);

let dateContainer = document.querySelectorAll(".date");
dateContainer = Array.from(dateContainer);
const listDate = new Array(dateLille, dateParis, dateLyon);

addDate(dateContainer, listDate);

function addDate(element, date) {
  for (let x = 0; x < listDate.length; x++) {
    let year = date[x].getFullYear();
    let month = date[x].getMonth();
    let day = date[x].getDate();
    let hours = date[x].getHours();
    let minutes = date[x].getMinutes();

    if (day < 10) {
      element[x].children[0].innerText =
        "0" +
        day +
        " / 0" +
        month +
        " / " +
        year +
        "  " +
        hours +
        ":" +
        minutes +
        "0";
    } else {
      element[x].children[0].innerText =
        day +
        " / 0" +
        month +
        " / " +
        year +
        "  " +
        hours +
        ":" +
        minutes +
        "0";
    }
  }
}

let timer = setInterval(function () {
  let now = new Date().getTime();

  let timeBetweenLille = listDate[0] - now;
  let timeBetweenParis = listDate[1] - now;
  let timeBetweenLyon = listDate[2] - now;
  const listTimeBetween = new Array(
    timeBetweenLille,
    timeBetweenParis,
    timeBetweenLyon
  );
  let hourcalcul = Math.floor(
    (listTimeBetween[0] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutescalcul = Math.floor(
    (listTimeBetween[0] % (1000 * 60 * 60)) / (1000 * 60)
  );
  let secondscalcul = Math.floor((listTimeBetween[0] % (1000 * 60)) / 1000);
  if (hourcalcul < 10) {
    hourcalcul = "0" + hourcalcul;
  }
  if (minutescalcul < 10) {
    minutescalcul = "0" + minutescalcul;
  }
  if (secondscalcul < 10) {
    secondscalcul = "0" + secondscalcul;
  }

  for (let x = 0; x < listDate.length; x++) {
    let daycalcul = Math.floor(listTimeBetween[x] / (1000 * 60 * 60 * 24));

    dateContainer[x].children[1].innerText =
      daycalcul + "j " + hourcalcul + ":" + minutescalcul + ":" + secondscalcul;
  }
}, 1000);
