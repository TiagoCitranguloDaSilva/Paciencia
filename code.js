
var arrayTransicao = [];
var pescasPossiveis = [];
var ordem = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
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

    let tam = CartasPossiveis.length
    for(let c = 0; c <= tam; c++){
        let escolhida = aleatorizar()
        pescasPossiveis.push(CartasPossiveis[escolhida]);
        CartasPossiveis.splice(escolhida, 1);
    }
}

function aleatorizar(){
    return Math.floor(Math.random() * (CartasPossiveis.length));
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
    if(escolhida[0] == 'paus' || escolhida[0] == 'espada'){
        carta.classList.add('preto');
    }else{
        carta.classList.add('vermelho');
    }
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
    
    let localAdd;
    let pos;
    
    if(local != 'AreaFinal'){
        localAdd = document.getElementById(local);
        pos = ordem.indexOf(elemento.innerHTML);

        if(localAdd.children.length == 0 && elemento.innerHTML != 'K'){
            // alert('N K');
            return;
        }

        if(localAdd.children[localAdd.children.length-1].innerHTML != ordem[pos+1] ){
            // alert('Ordem errada');
            return;
        }

        if(localAdd.children[localAdd.children.length-1].classList[2] == elemento.classList[2]){
            // alert('Cores iguais');
            return;
        }
    }else if(local == 'AreaFinal'){
        localAdd = document.getElementById(elemento.classList[1]);
        
        if(localAdd.children.length == 0 && elemento.innerHTML != 'A'){
            return;
        }

        pos = ordem.indexOf(elemento.innerHTML);

        if(localAdd.children.length > 0){
            if(localAdd.children[localAdd.children.length-1].innerHTML != ordem[pos - 1]){
                return;
            }
        }

    }
    finalizar();
}
function finalizar(){
    origem = elemento.parentElement.id;
    let localAdd;
    let posCarta = document.getElementById(origem).children.lengh;
    if(local == 'AreaFinal'){
        local = elemento.classList[1];
    }
    localAdd = document.getElementById(local);
    
    for(let c = 0; c < document.getElementById(origem).children.length; c++){
        if(elemento.id == document.getElementById(origem).children[c].id){
            posCarta = c;
        }
    }
    let cont = 0;
    let localCarta = posCarta;
    while(posCarta <= document.getElementById(origem).children.length){
        cont++;
        let atual = document.getElementById(origem).children[localCarta];
        conteudo = [atual.classList[1], atual.innerHTML];
        let cartaAtual = criarCarta(conteudo, [], false, false);
        let altura = (localAdd.children.length) * absoluteLocal;
        cartaAtual.style.top = altura+'px';
        localAdd.appendChild(cartaAtual);
        atual.remove();
        
        if(origem == 'pesca'){
            let areaPesca = document.getElementById(origem);
            if(arrayTransicao.length > 0){
                let cartaPesca = criarCarta(arrayTransicao[arrayTransicao.length-2], [], false, false);
                areaPesca.appendChild(cartaPesca);
            }
            if(localAdd.children.length > 1){
                localAdd.children[0].remove();
            }
            break;
        }
        posCarta++;
    }
    
    aparecer()
}

function aparecer(){
    if(document.getElementById(origem).children.length > 0){
        if(document.getElementById(origem).children[document.getElementById(origem).children.length - 1].classList[1] == 'escondida'){
            document.getElementById(origem).children[document.getElementById(origem).children.length - 1].classList.remove('escondida');
        }
    }
}

function pescar(){
    let areaPesca = document.getElementById('pesca');
    if(pescasPossiveis.length == 0){
        let botaoReiniciarPesca =  document.getElementById('botao');
        botaoReiniciarPesca.style.display = 'flex';
    }
    arrayTransicao.push(pescasPossiveis[0]);
    pescasPossiveis.splice(0, 1);
    
    if(areaPesca.children.length > 2){
        areaPesca.children[2].remove();
    }
    
    let carta = criarCarta(arrayTransicao[arrayTransicao.length-1], [], false, false);
    areaPesca.appendChild(carta);
}

function devolver(){
    while(arrayTransicao.length > 0){
        pescasPossiveis.push(arrayTransicao[0]);
        arrayTransicao.splice(0, 1);
    }
    let botaoReiniciarPesca =  document.getElementById('botao');
    botaoReiniciarPesca.style.display = 'none';


}