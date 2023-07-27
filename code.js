
var mesa = document.getElementById('container')
var qtdeColunas = 6
var CartasPossiveis = [];
var Naipes = ['espada', 'copas', 'paus', 'ouros'];
for(let c = 0; c < Naipes.length; c++){
    for(let d = 1; d <= 13; d++){
        let valor = d
        switch(valor){
            case 1:
                valor = 'A';
                break;
            
            case 11: 
                valor = 'Q';
                break;
            
            case 12: 
                valor = 'J';
                break;
            
            case 13: 
                valor = 'K';
                break;
        }
        CartasPossiveis.push([Naipes[c], valor]);
    }
}

iniciarJogo();

function iniciarJogo(){
    for(let c = 0; c < qtdeColunas; c++){

        // Criar coluna

        let coluna = document.createElement('section');
        coluna.id = 'coluna'+c;
        coluna.classList.add('coluna')
        mesa.appendChild(coluna);
        let colunaAtual = document.getElementById('coluna'+c);
        let escolhido;
        let classes = [];
        for(let d = 0; d <= c; d++){
            escolhido = aleatorizar();
            if(d != c){
                classes.push('escondida');
            }
            let cartaAtual = criarCarta(escolhido, classes);
            let contagem = 0    
            for(let e = 0; e < colunaAtual.children.length; e++){
                contagem += 60; 
            }
            cartaAtual.style.top = contagem+'px';
            colunaAtual.appendChild(cartaAtual);
        }
    }
}

function aleatorizar(){
    return Math.floor(Math.random() * (CartasPossiveis.length - 1)) + 1;
}

function criarCarta(escolha, classes, removerCartasPossiveis = false){
    
    let escolhida = CartasPossiveis[escolha];
    let carta = document.createElement('section');
    carta.classList.add('cartas');
    for(let c = 0; c < classes.length; c++){
        carta.classList.add(classes[c]);
    }
    console.log(escolhida)
    carta.classList.add(escolhida[0]);

    carta.innerHTML = escolhida[1];

    if(removerCartasPossiveis){
        CartasPossiveis.splice(escolha);
    }

    return carta;
}