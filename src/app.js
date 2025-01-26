/* eslint-disable */
import "bootstrap";
import "./style.css";

window.onload = function() {
  //write your code here
  let mazo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let pintas = [
    { type: "spade", figure: "♠" },
    { type: "club", figure: "♣" },
    { type: "heart", figure: "♥" },
    { type: "diamond", figure: "♦" }
  ];

  let cartasGeneradas = [];
  let cartasOrdenadas = [];
  let cardContainer = document.getElementById("CardContainer");

  const generarCartas = num => {
    for (let index = 0; index < num; index++) {
      let random = Math.floor(Math.random() * 13);
      let roll = Math.floor(Math.random() * 4);
      let col = document.createElement("div");
      let card = document.createElement("div");
      col.setAttribute("class", " col-1 me-2");
      card.classList.add("card", "text-center");
      let arriba = document.createElement("p");
      arriba.setAttribute("class", "position-absolute top-0 start-0 mx-3 my-1");
      arriba.style.color =
        pintas[roll].type === "heart" || pintas[roll].type === "diamond"
          ? "red"
          : "black";
      arriba.textContent = pintas[roll].figure;
      card.appendChild(arriba);
      let numero = document.createElement("p");
      numero.classList.add("numero");
      numero.textContent = mazo[random];
      card.appendChild(numero);
      let abajo = document.createElement("p");
      abajo.setAttribute("class", "position-absolute bottom-0 end-0 mx-3 my-1");
      abajo.style.color =
        pintas[roll].type === "heart" || pintas[roll].type === "diamond"
          ? "red"
          : "black";
      abajo.textContent = pintas[roll].figure;
      card.appendChild(abajo);
      col.appendChild(card);
      cardContainer.appendChild(col);
      cartasGeneradas.push({ mazo: mazo[random], pintas: pintas[roll].figure });
    }
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
    for (let index = 0; index < cards.length - 1; index++) {
      let min = index;
      for (let j = min + 1; j < cards.length; j++) {
        if (cards[j].mazo < cards[min].mazo) {
          min = j;
        }
      }
      if (min !== index) {
        const temp = cards[index];
        cards[index] = cards[min];
        cards[min] = temp;
        cartasOrdenadas.push([...cards]);
      }
    }
    return cards;
  }

  const buttom = document.getElementById("ordenar");

  buttom.addEventListener("click", function() {
    sortCards(cartasGeneradas);
    console.log(cartasOrdenadas);
    const formulario = document.getElementById("form");
    formulario.reset();
  });
};
