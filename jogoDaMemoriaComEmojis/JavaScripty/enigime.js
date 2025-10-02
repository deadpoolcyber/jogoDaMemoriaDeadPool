// Array com as imagens do jogo, 2 de cada para formar os pares
const imagens = [
    "src/01.png", "src/01.png",
    "src/02.png", "src/02.png",
    "src/03.png", "src/03.png",
    "src/04.png", "src/04.png",
    "src/05.png", "src/05.png",
    "src/06.png", "src/06.png",
    "src/07.png", "src/07.png",
    "src/08.png", "src/08.png"
];

// Array para armazenar as cartas que estão abertas no momento
let openCards = [];

// Embaralha o array de imagens de forma aleatória
let shuffleImagens = imagens.sort(() => Math.random() - 0.5);

// Cria os quadradinhos (cartas) do jogo e adiciona na tela
for (let i = 0; i < imagens.length; i++) {
    let box = document.createElement("div"); // cria um div para a carta
    box.className = "item"; // adiciona a classe CSS 'item'

    // cria a tag <img> que vai mostrar a imagem da carta
    let img = document.createElement("img");
    img.src = shuffleImagens[i]; // define a imagem embaralhada
    img.alt = "carta"; // texto alternativo da imagem
    box.appendChild(img); // adiciona a imagem dentro do div

    // adiciona o evento de clique na carta
    box.onclick = handleClick;

    // adiciona a carta na área do jogo
    document.querySelector(".game").appendChild(box);
}

// Função chamada quando uma carta é clicada
function handleClick() {
    // só permite abrir no máximo 2 cartas por vez
    if (openCards.length < 2) {
        this.classList.add("boxOpen"); // adiciona a classe que abre a carta
        openCards.push(this); // adiciona a carta ao array de abertas
    }

    // se já houver 2 cartas abertas, verifica se elas combinam
    if (openCards.length == 2) {
        setTimeout(checkMatch, 500); // chama a função de verificação com delay de 0,5s
    }
}

// Função que verifica se as duas cartas abertas são iguais
function checkMatch() {
    // pega o caminho das imagens das duas cartas abertas
    let img1 = openCards[0].querySelector("img").src;
    let img2 = openCards[1].querySelector("img").src;

    if (img1 === img2) { 
        // se forem iguais, marca como combinadas
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        // se não forem iguais, fecha as cartas
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = []; // limpa o array para permitir abrir novas cartas

    // condição de vitória: se todas as cartas estiverem combinadas
    if (document.querySelectorAll(".boxMatch").length === imagens.length) {
        alert("Você Venceu!! 🎉"); // mostra mensagem de vitória
    }
}
