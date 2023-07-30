
var origem;
var absoluteLocal = 40;
var elemento;
var local;
var blur = document.getElementById('blur');
var mesa = document.getElementById('container');
var qtdeColunas = 6;
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
        coluna.id = 'coluna'+(c+1);
        coluna.classList.add('coluna')
        mesa.appendChild(coluna);
        let colunaAtual = document.getElementById('coluna'+(c+1));
        let escolhido;
        for(let d = 0; d <= c; d++){
            let classes = [];
            escolhido = aleatorizar();
            if(d != c){
                classes.push('escondida');
            }
            let cartaAtual = criarCarta(escolhido, classes, true);
            let contagem = 0    
            for(let e = 0; e < colunaAtual.children.length; e++){
                contagem += absoluteLocal; 
            }
            cartaAtual.style.top = contagem+'px';
            colunaAtual.appendChild(cartaAtual);
        }
    }
}

function aleatorizar(){
    return Math.floor(Math.random() * (CartasPossiveis.length - 1)) + 1;
}

function criarCarta(escolha, classes, removerCartasPossiveis = false, aleatorizar = true){
    
    let escolhida;
    if(aleatorizar){
        escolhida = CartasPossiveis[escolha];
    }else{
        escolhida = escolha;
    }
    let carta = document.createElement('section');
    carta.classList.add('cartas');
    for(let c = 0; c < classes.length; c++){
        carta.classList.add(classes[c]);
    }
    carta.classList.add(escolhida[0]);
    carta.setAttribute('onclick', 'mover(this)');
    carta.innerHTML = escolhida[1];
    carta.id = escolhida[0]+'-'+escolhida[1];

    if(removerCartasPossiveis){
        CartasPossiveis.splice(escolha, 1);
    }

    return carta;
}

function mover(element){
    blur.style.display = 'flex';
    elemento = element;
}

function escolha(valorEscolha){
    blur.style.display = 'none';
    switch(valorEscolha){
        case '1':
            local = 'coluna1';
            break;
        case '2':
            local = 'coluna2';
            break;
        case '3':
            local = 'coluna3';
            break;
        case '4':
            local = 'coluna4';
            break;
        case '5':
            local = 'coluna5';
            break;
        case '6':
            local = 'coluna6';
            break;
        case '7':
            local = 'AreaFinal';
            break;
    }

    verificacoes()
}

function verificacoes(){
    finalizar()
}

function finalizar(){
    origem = elemento.parentElement.id;
    let localAdd;
    if(local == 'AreaFinal'){
        alert('n fiz ainda');
    }else{
        localAdd = document.getElementById(local);
    }
    elemento.remove();
    conteudo = [elemento.classList[1], elemento.innerHTML];
    let cartaAtual = criarCarta(conteudo, [], false, false);
    let altura = (localAdd.children.length) * absoluteLocal;
    cartaAtual.style.top = altura+'px';
    localAdd.appendChild(cartaAtual);
    
    aparecer()
}

function aparecer(){
    if(document.getElementById(origem).children.length > 0){
        if(document.getElementById(origem).children[document.getElementById(origem).children.length - 1].classList[1] == 'escondida'){
            document.getElementById(origem).children[document.getElementById(origem).children.length - 1].classList.remove('escondida');
        }
    }
}