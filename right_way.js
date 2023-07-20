const criarCartas = () => {
    const list_of_cards = [];
    const list_of_colors = ['color-blue', 'color-yellow', 'color-red', 'color-green'];

    for (let i = 0; i <= 9; i++) {
        if (i === 0) {
            for (const color of list_of_colors) {
                const card = `
                    <article class="card selected-card ${color}">
                        <p class="left number">${i}</p>
                        <p class="text-center inside">${i}</p>
                        <p class="right number">${i}</p>
                    </article>`;
                list_of_cards.push(card);
            }
        } else {
            for (let j = 0; j < 2; j++) {
                for (const color of list_of_colors) {
                    const card = `
                        <article class="card selected-card ${color}">
                            <p class="left number">${i}</p>
                            <p class="text-center inside">${i}</p>
                            <p class="right number">${i}</p>
                        </article>`;
                    list_of_cards.push(card);
                }
            }
        }
    }
    return list_of_cards;
};


const renderCards = () => {
    const list_of_cards = criarCartas();
    const div = document.querySelector('#player-cards');
    for (const card of list_of_cards) {
        div.insertAdjacentHTML('beforeEnd', card);
    }
};


const removerCartasDaMesa = () => {
    e = document.querySelector('#main-stack article')
    e.removeEventListener('click', discartarCarta)
    e.remove()
}


const encontarCorDaCarta = (card) => {
    objeto = Array.from(card.classList);

    const cor = objeto.find(color => {
        // Verifica se o nome da propriedade começa com o nome fornecido (ignorando maiúsculas e minúsculas)
        return color.toLowerCase().startsWith('color-'.toLowerCase());
    });

    return cor;
}


const setActualCard = () => {
    card_atual = document.querySelector('#main-stack article');
    return card_atual;
}


// comparacao por numero e cor
const verificarSePodeJogar = () => {

    // ultima carta da mesa
    card_atual = setActualCard()
    card_atual_color = encontarCorDaCarta(card_atual);
    card_atual_number = card_atual.firstElementChild.innerText || undefined
    console.log(card_atual_color)

    // suas cartas
    cards = document.querySelectorAll('#player-cards article.card');

    
    cards.forEach((card) => {
        const cardNumber = card.firstElementChild.innerText || undefined;
        
        if (encontarCorDaCarta(card) == card_atual_color
            || cardNumber == card_atual_number
                || card.classList.contains('choose-card')) {

            card.addEventListener('click', discartarCarta);
            
            card.classList.add('selected-card');
            card.classList.remove('unselected-card');
          } else {
            card.classList.remove('selected-card');
            card.classList.add('unselected-card');
          }
        card_atual.classList.remove('selected-card')
    });
}


const discartarCarta = (e) => {
    stack = document.querySelector('#main-stack');
    removerCartasDaMesa()

    // carta comum
    let to_insert = e.target;

    while (to_insert.nodeName !== 'ARTICLE') {
        to_insert = to_insert.parentNode;

        if (!to_insert) break;
    }

    
    to_insert.classList.remove('selected-card')
    stack.appendChild(to_insert);
    
    // carta de escolher a cor
    //ou +4
    if (to_insert.classList.contains('choose-card')) {
        escolherCorDoCard()
    } else {
        removerAcaoDaCarta();
        novoRodada()
    }
}


const findChooseCard = () => {
    card_special = document.querySelectorAll('#player-cards article.choose-card');

    if (card_special.length != 0) {
        card_special.forEach((card) => {
            card.addEventListener('click', discartarCarta);
        })
    }
}


const removerAcaoDaCarta = () => {
    document.querySelectorAll('#player-cards > article.card').forEach(element => {
        element.removeEventListener('click', discartarCarta)
    });
}


const novoRodada = () => {
    findChooseCard()
    verificarSePodeJogar();
}


const trocarCor = (e) => {
    let nova_cor = e.target.value;

    card_atual = setActualCard()
    card_atual.classList.add(nova_cor)
    card_atual.removeEventListener('click', discartarCarta);
    
    document.querySelector('#escolher-cor').style.display = "none";
    document.querySelector('#main-stack').style.filter = "none";
    document.querySelector('#player-cards').style.filter = "none";

    removerAcaoDaCarta();
    novoRodada()
}

const escolherCorDoCard = () => {
    document.querySelector('#escolher-cor').style.display = "grid";
    document.querySelector('#main-stack').style.filter = "blur(1.5rem)";
    document.querySelector('#player-cards').style.filter = "blur(1.5rem)";

}


// main program
document.querySelectorAll('#escolher-cor > article.choose-card > div.choose-card-inside button').forEach((botoes_de_cor) => {
    botoes_de_cor.addEventListener('click', trocarCor);
})

renderCards();
findChooseCard()
verificarSePodeJogar();