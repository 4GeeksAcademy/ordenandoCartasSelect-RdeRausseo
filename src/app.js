/* eslint-disable */
import "bootstrap";
import "./style.css";

window.onload = function() {
  //write your code here
  let mazo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let pintas = ["♠", "♥", "♣", "♦"];
  let cartasGeneradas = [];
  let cartasOrdenadas = [];
  const letraPorNumero = x =>
    x === 1 ? "A" : x === 11 ? "J" : x === 12 ? "Q" : x === 13 ? "K" : x;

  let cardContainer = document.getElementById("CardContainer");
  let orderCard = document.getElementById("orderCard");

  const crearCarta = (num, vira) => {
    let card = document.createElement("div");
    card.classList.add("card", "mt-3", "p-1", "text-center", "me-2");
    let arriba = document.createElement("p");
    arriba.setAttribute("class", "position-absolute top-0");
    arriba.style.color =
      pintas[vira] === "♥" || pintas[vira] === "♦" ? "red" : "black";
    arriba.textContent = pintas[vira];
    card.appendChild(arriba);
    let numero = document.createElement("p");
    numero.textContent = letraPorNumero(num);
    card.appendChild(numero);
    let abajo = document.createElement("p");
    abajo.setAttribute("class", "position-absolute bottom-0 end-0 mx-3 my-1");
    abajo.style.color =
      pintas[vira] === "♥" || pintas[vira] === "♦" ? "red" : "black";
    abajo.textContent = pintas[vira];
    card.appendChild(abajo);
    return card;
  };

  const generarCartas = num => {
    const div = document.createElement("div");
    div.setAttribute("class", "d-flex");
    for (let index = 0; index < num; index++) {
      let random = Math.floor(Math.random() * mazo.length);
      let roll = Math.floor(Math.random() * pintas.length);
      const carta = { num: random, vira: roll };
      cartasGeneradas.push(carta);
      div.appendChild(crearCarta(random, roll));
    }
    cardContainer.appendChild(div);
    console.log(cartasGeneradas);
  };

  const numeroCartas = document.getElementById("numerosGenerados");
  const btn = document.getElementById("generar");

  btn.addEventListener("click", function() {
    if (cartasGeneradas.length > 0) {
      while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
      }
      cartasGeneradas = [];
      cartasOrdenadas = [];
    }
    generarCartas(numeroCartas.value);
    const formulario = document.getElementById("form");
    formulario.reset();
  });

  function sortCards(cards) {
    for (let i = 0; i < cards.length - 1; i++) {
      let min = i;
      for (let x = min + 1; x < cards.length; x++) {
        if (cards[x].num < cards[min].num) {
          min = x;
        }
      }
      if (min !== i) {
        const temp = cards[i];
        cards[i] = cards[min];
        cards[min] = temp;
        cartasOrdenadas.push([...cards]);
      }
    }
    return cards;
  }

  const mostrarCartasOrdenadas = () => {
    for (let i = 0; i < cartasOrdenadas.length; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "col-12 d-flex");
      for (let x = 0; x < cartasOrdenadas[i].length; x++) {
        div.appendChild(
          crearCarta(cartasOrdenadas[i][x].num, cartasOrdenadas[i][x].vira)
        );
      }
      orderCard.appendChild(div);
    }
  };

  const buttom = document.getElementById("ordenar");

  buttom.addEventListener("click", function() {
    sortCards(cartasGeneradas);
    console.log(cartasOrdenadas, "cartas ordenadas");
    mostrarCartasOrdenadas();
    const formulario = document.getElementById("form");
    formulario.reset();
  });
};
