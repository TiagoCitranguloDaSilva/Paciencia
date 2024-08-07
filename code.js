
// import {Carta} from "/js/Carta.js";
// import {Coluna} from "/js/Coluna.js";

// Definição de variáveis

// Array de transição de cartas na área final
var arrayTransicaoFinal = [[], [], [], []];

var colunas = []

// Array de transição da área de pesca
var arrayTransicao = [];

// Pesca que são possiveis fazer
var pescasPossiveis = [];

// Ordem das cartas
var ordem = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Variavel que guardará de onde veio as cartas
var origem;

// De quantos em quantos pixels cada carta ficará distante da outra na mesa
var absoluteLocal = 30;

// Receberá o elemento clicado
var elemento;

var coluna = 0;

// Local de destino que uma carta terá ao ser clicada
var local;

// Div do blur
var blurFilter = document.getElementById('blur');

// A mesa
var mesa = document.getElementById('container');

// Quantidade de coluna que tem na mesa
var qtdeColunas = 6;

// Iniciação da array de cartas que ainda não foram escolhidas
var CartasPossiveis = [];

// Os naipes do jogo
var Naipes = ['espada', 'copas', 'paus', 'ouros'];

// Um for que roda pela quantidade de naipes existentes
for(let c = 0; c < Naipes.length; c++){

    // Um for que roda pela quantidade de cartas que cada naipe tem
    for(let d = 0; d < ordem.length; d++){

        // A variável valor receberá o valor da carta com base na array 'ordem'
        let valor = ordem[d];

        // Ele adiciona o valor da carta e seu naipe na array 'CartasPossiveis'
        // CartasPossiveis.push([Naipes[c], valor]);
        CartasPossiveis.push(criarElementoCarta(Naipes[c], valor))
    }
}

function criarElementoCarta(naipe, valor){
    let carta = new Carta(valor, naipe);
    console.log(carta)
    return carta;
}

// Depois das preparações acima, inicia-se o jogo
iniciarJogo();

// Função que é chamada assim que a pagina carrega
function iniciarJogo(){

    // Um for que roda pela quantidade de colunas que a mesa vai ter
    for(let c = 0; c < qtdeColunas; c++){

        let elementoColuna = new Coluna();

        Coluna.definirContColuna(c + 1);

        elementoColuna.createHTMLElement(mesa);

        // Variável que irá guardar os valores da carta que foi escolhida aleatoriamente
        let escolhido;

        // É um for que irá colocar a quantidade de cartas com base no número da coluna, tipo, coluna 1 terá 1 carta, a coluna 2 terá 2 cartas e por ai vai
        for(let d = 0; d <= c; d++){

            let classes = [];
            if(d != c){

                // Adiciona a classe 'escondida' para a array de classes extras
                classes.push('escondida');
            }

            // Cria a array que irá guardar as classes extras que serão colocadas nas cartas

            // Ele escolhe uma das arrays dentro de 'CartasPossiveis'
            escolhido = aleatorizar();

            let carta = escolhido.criarCartaHTML(classes)


            // Entrará quando todas as cartas forem criadas, menos a ultima de cada coluna
            

            // Chama a classe que cria a carta e retorna o elemento, você envia os valores (escolhido), as classes extras (classes), e se quando criar a carte, deve apaga-la do cartasPossiveis (true)
            // let cartaAtual = criarCarta(escolhido, classes, true);


            // Cria um contagem que começa com 0
            let contagem = 0 ;   

            // Um for que roda pela quantidade de cartas que já foram adicionadas na coluna atual
            for(let e = 0; e < elementoColuna.pegarQtdeCartas(); e++){

                // Pra cada carta adicionada na coluna irá adicionar o valor do 'absoluteLocal' na variável 'contagem'
                contagem += absoluteLocal; 
            }

            
            
            // Adiciona a carta na posição da contagem
            carta.style.top = contagem+'px';
            
            elementoColuna.adicionarCarta(escolhido, carta);
            elementoColuna.definirQtdeCartas(1);
            elementoColuna.adicionarCartaHTML(carta);
        }
        colunas.push(elementoColuna);
    }

    // Tam irá guardar o tamanho da array 'CartasPossiveis'
    let tam = CartasPossiveis.length;

    // Pra cada carta restante em 'CartasPossiveis' que não foi escolhida pra ficar na mesa
    for(let c = 0; c < tam; c++){

        // Escolhida irá receber um valor aleatorio com base no tamanho da array 'CartasPossiveis'
        let escolhida = aleatorizar();

        // Adiciona na array 'pescasPossiveis' a carta que foi escolhida aleatoriamente
        pescasPossiveis.push(escolhida);

    }
}

// Função que retorna um valor aleatório com base no tamanho da array 'CartasPossiveis'
function aleatorizar(){

    // Retorna o valor aleatório
    let valorEscolhido = Math.floor(Math.random() * (CartasPossiveis.length));
    let carta = CartasPossiveis[valorEscolhido];
    CartasPossiveis.splice(valorEscolhido, 1);
    return carta;

}

function criarCarta(){
    return "";
}

// Função chamada ao clicar em uma carta
function mover(element){

    // Coloca blur na tela
    blurFilter.style.display = 'flex';

    // Define a variável 'elemento' como o elemento clicado
    elemento = element;
}

// Função chamada ao escolher o destino que a carta clicada irá ser enviada
function escolha(valorEscolha){

    // Retira o blur da tela
    blurFilter.style.display = 'none';

    // Qual local você escolheu
    switch(valorEscolha){

        // Se escolheu a primeira coluna
        case '1':
            local = 'coluna1';
            break;
        
        // Se escolheu a segunda coluna
        case '2':
            local = 'coluna2';
            break;

        // Se escolheu a terceira coluna
        case '3':
            local = 'coluna3';
            break;

        // Se escolheu a quarta coluna
        case '4':
            local = 'coluna4';
            break;

        // Se escolheu a quinta coluna
        case '5':
            local = 'coluna5';
            break;

        // Se escolheu a sexta coluna
        case '6':
            local = 'coluna6';
            break;

        // Se escolher a area final como destino
        case '7':
            local = 'AreaFinal';
            break;
    }

    // Uma função que verifica se a carta pode ser movida
    verificacoes();

}

// Uma função que verifica se a carta pode ser movida
function verificacoes(){
    
    // Receberá o destino da carta
    let localAdd;

    // A posição da carta com relação a ordem definida na array 'ordem'
    let pos;
    
    // Se o destino não for a area final
    if(local != 'AreaFinal'){

        // O local de destino é a coluna escolhida
        localAdd = document.getElementById(local);

        // Ve a posição da carta com relação a ordem
        pos = ordem.indexOf(elemento.innerHTML);

        // Se o destino não tiver outras cartas e a carta que irá ser colocada lá não é um K
        if(localAdd.children.length == 0 && elemento.innerHTML != 'K'){

            // Sai da função sem mover a carta
            return;

        }

        // Se o destino tiver outras cartas
        if(localAdd.children.length > 0){

            // Se o valor da carta que ficará em cima da carta a ser movida for diferente do valor que viria depois segundo a ordem na array 'ordem'. Lembrando que a ordem na mesa é decrescente
            if(localAdd.children[localAdd.children.length-1].innerHTML != ordem[pos+1] ){
                
                // Sai da função sem mover a carta
                return;

            }
    
            // Se a carta que ficará em cima da carta a ser movida for da mesma cor que a carta que será movida. Lembrando que na mesa, as cores tem que se intercalar entre preto e vermelho
            if(localAdd.children[localAdd.children.length-1].classList[2] == elemento.classList[2]){

                // Sai da função sem mover a carta
                return;

            }
        }

    // O local de destino for a área final
    }else if(local == 'AreaFinal'){

        // O local de destino é a área final com base no naipe da carta clicada
        localAdd = document.getElementById(elemento.classList[1]);
        
        // Se a área final não tiver cartas colocadas anteriormente e a carta que será movida não for um 'A'. Lembrando que na area final a ordem é crescente
        if(localAdd.children.length == 0 && elemento.innerHTML != 'A'){

            // Sai da função sem mover a carta
            return;

        }

        // Guarda a posição da carta com base na array 'ordem'
        pos = ordem.indexOf(elemento.innerHTML);

        // Se a área final tiver cartas adicionadas anteriormente
        if(localAdd.children.length > 0){

            // Se o valor da última carta da área final for diferente do valor que deveria ter antes da carta que irá ser movida
            if(localAdd.children[localAdd.children.length-1].innerHTML != ordem[pos - 1]){

                // Sai da função sem mover a carta
                return;
            
            }
        }
    }

    // Uma função visada em finalizar o processo de mover cartas
    finalizar();

}

// Uma função visada em finalizar o processo de mover cartas
function finalizar(){

    // 'origem' recebe o id do local que a carta clicada veio 
    origem = elemento.parentElement.id;

    // Local que a carta será adicionada
    let localAdd;

    // Recebe a quantidade de cartas do local que a carta veio originalmente
    let posCarta = document.getElementById(origem).children.lengh;

    // Se o destino for a área final
    if(local == 'AreaFinal'){

        // O local de destino é a área final do naipe da carta clicada
        localAdd = document.getElementById(elemento.classList[1]);

    }else{

        // O local de destino é a coluna escolhida
        localAdd = colunas[parseInt(local.slice(6, 7))-1];

    }
    
    // Um for que roda pela quantidade de cartas no local de origem
    for(let c = 0; c < document.getElementById(origem).children.length; c++){

        // Se o id da carta clicada for o mesmo do elemento que esta sendo acessado pelo for
        if(elemento.id == document.getElementById(origem).children[c].id){

            // A 'posCarta' receberá o valor do for
            posCarta = c;

        }
    }

    // Cria um contador que começa com 0
    let cont = 0;

    // O local da carta é igual a posição da carta clicada
    let localCarta = posCarta;

    // Variável usada para dizer se deve ou não sair do while
    let sair = false;

    // Enquanto a posição da carta for menor que a quantidade de cartas do local que a carta veio
    while(posCarta < document.getElementById(origem).children.length && !sair){

        // Se o local for a área final
        if(local == 'AreaFinal'){

            // Se a quantidade de cartas no local de origem menos a posição da carta clicada for maior que 1
            if(document.getElementById(origem).children.length - posCarta > 1){

                // Sai da função sem mover a carta
                return;

            }

            // Se a área final já tiver uma carta lá
            if(localAdd.children.length > 0){

                // Remove a carta que já estava dentro da área final
                localAdd.children[0].remove();

            }
        }

        // Adiciona 1 ao contador
        cont++;

        // 'atual' recebe a carta atual vindo pelo while
        let atual = document.getElementById(origem).children[localCarta];

        // Pega o valor da carta atual
        conteudo = [atual.classList[1], atual.innerHTML];

        // A 'cartaAtual' recebe a carta depois de enviar o valor, nenhuma classe extra, sem retirar do 'CartasPossives' e avisa que a carta não esta dentro de 'CartasPossiveis'
        // let cartaAtual = criarCarta(conteudo, [], false, false);
        let elementoColunaAtual = colunas[parseInt(origem.slice(6, 7)) - 1]
        let elementoCartaAtual = elementoColunaAtual.devolverCarta(localCarta)
        let cartaAtual = elementoCartaAtual;

        // A altura que a carta será colocada é o número de cartas no local de destino multiplicado pela 'absoluteLocal'
        let altura = (localAdd.pegarQtdeCartas()) * absoluteLocal;

        // Coloca a carta na altura definida anteriormente
        cartaAtual[1].style.top = altura+'px';

        // Adiciona a carta ao destino
        localAdd.adicionarElementoCartaHtml(cartaAtual[0], cartaAtual[1]);

        // Remove a carta do local de origem
        atual.remove();

        // Se a carta veio da área de pesca
        if(origem == 'pesca'){

            // Pega a área de pesca
            let areaPesca = document.getElementById(origem);
            
            // Apaga a carta que veio antes da 'arrayTransicao'
            arrayTransicao.splice(arrayTransicao.length-1, 1);

            // Se o tamanho da 'arrayTransicao' for maior que 0
            if(arrayTransicao.length > 1){

                // Cria uma carta que é a carta de pesca que apareceu antes da que foi mudada de lugar
                let cartaPesca = criarCarta(arrayTransicao[arrayTransicao.length-1], [], false, false);

                // Adiciona a carta na área de pesca
                areaPesca.appendChild(cartaPesca);

            }

            // Sai do while
            sair = true
        }

        // Se a carta movida tiver vindo da área final
        if(origem == elemento.classList[1]){

            // Pega a área final em que a carta estava
            let areaFinalCarta = document.getElementById(origem);

            // Variável que recebe a chave do respectivo naipe
            let key;

            // Switch de verificação do naipe da carta clicada
            switch(elemento.classList[1]){

                // Se for do naipe de espada
                case 'espada':
                    key = 0;
                    break;

                // Se for do naipe de copas
                case 'copas':
                    key = 1;
                    break;

                // Se for do naipe de paus
                case 'paus':
                    key = 2;
                    break;

                // Se for do naipe de ouros
                case 'ouros':
                    key = 3;
                    break;
                
            }

            
            // Se o tamanho da array de transição for maior que 0
            if(arrayTransicaoFinal[key].length > 1){
                                
                // Apaga a carta anterior da array de transição de cartas na área final
                arrayTransicaoFinal[key].splice(arrayTransicaoFinal[key].length-1, 1);

                // A carta anterior que estaria antes da carta movida
                let cartaFinal = criarCarta(arrayTransicaoFinal[key][arrayTransicaoFinal[key].length-1], [], false, false);

                // Adiciona a carta anterior na área final
                areaFinalCarta.appendChild(cartaFinal);

            }

            // Sai do while
            sair = true;

        }

        // Se o local de destino for a área final
        if(local == 'AreaFinal'){

            // Variável que recebe a chave do respectivo naipe
            let key;

            // Switch de verificação do naipe da carta clicada
            switch(elemento.classList[1]){

                // Se for do naipe de espada
                case 'espada':
                    key = 0;
                    break;

                // Se for do naipe de copas
                case 'copas':
                    key = 1;
                    break;

                // Se for do naipe de paus
                case 'paus':
                    key = 2;
                    break;

                // Se for do naipe de ouros
                case 'ouros':
                    key = 3;
                    break;
                
            }

            // Adiciona o valor e o naipe da carta na 'arrayTransicaoFinal'
            arrayTransicaoFinal[key].push([elemento.classList[1], elemento.innerHTML]);
        }
    }
    
    // Função com a função de verificar se deve retirar a classe 'escondida' e retirar se necessário 
    aparecer();

    // Pega as áreas finais de todos os naipes
    let areaFinal = document.getElementById('AreaFinal');

    // Se todas as áreas finais tiverem cartas
    if(areaFinal.children[0].children.length > 0 && areaFinal.children[1].children.length > 0 && areaFinal.children[2].children.length > 0 && areaFinal.children[3].children.length > 0){

        // Se a última carta de todas as áreas finais for um 'K', ou seja a última carta possivel na ordem
        if(areaFinal.children[0].children[0].innerHTML == 'K' && areaFinal.children[1].children[0].innerHTML == 'K' && areaFinal.children[2].children[0].innerHTML == 'K' && areaFinal.children[3].children[0].innerHTML == 'K'){

            // Avisa que você ganhou o jogo
            alert('Parabéns, você ganhou!');

            // Recarrega a página
            document.location.reload();

        }
    }
}


// Função com a função de verificar se deve retirar a classe 'escondida' e retirar se necessário 
function aparecer(){

    // Se o local de origem da carta movida tiver mais cartas
    if(document.getElementById(origem).children.length > 0){

        // Se a última carta do local de origem tiver a classe 'escondida'
        if(document.getElementById(origem).children[document.getElementById(origem).children.length - 1].classList[1] == 'escondida'){

            // Retira a classe 'escondida' da última carta
            document.getElementById(origem).children[document.getElementById(origem).children.length - 1].classList.remove('escondida');
        }
    }
}

// Função rodada ao clicar o botão de pescar
function pescar(){

    // Pega a área de pesca
    let areaPesca = document.getElementById('pesca');

    // Se a área de pesca já tiver uma carta antes de você clicar no botão 
    if(areaPesca.children.length > 2){

        // Retira a carta anterior
        areaPesca.children[2].remove();

    }

    // Se não houver mais cartas possiveis para pescar e não houver cartas na array de transição
    if(pescasPossiveis.length == 0 && arrayTransicao.length > 0){

        // Pega o botão de reiniciar a pesca
        let botaoReiniciarPesca =  document.getElementById('botao');

        // Faz o botão de reiniciar a pesca aparecer 
        botaoReiniciarPesca.style.display = 'flex';

    // Se tiver cartas possiveis a serem pescadas
    }else if(pescasPossiveis != 0){

        // Adiciona a carta pescada na array de transição
        arrayTransicao.push(pescasPossiveis[0]);

        // Retira a carta pescada das pescas possiveis
        pescasPossiveis.splice(0, 1);

        // Cria a carta pescada
        let carta = criarCarta(arrayTransicao[arrayTransicao.length-1], [], false, false);

        // Adiciona a carta pescada na área de pesca
        areaPesca.appendChild(carta);

    }else{

        // Avisa que não há mais cartas para serem pescadas
        alert('Não há mais cartas');
    }
}

// Função com a função de devolver as cartas pra array de 'pescasPossiveis'
function devolver(){

    // Pega o tamanho da array de transição
    let tam = arrayTransicao.length

    // Um for que roda pelo tamanho da 'arrayTransicao'
    for(let c = 0; c < tam; c++){

        // Adiciona as cartas na array de pescas possiveis
        pescasPossiveis.push(arrayTransicao[0]);

        // Retira o valor atual da array de transição
        arrayTransicao.splice(0, 1);

    }

    // Pega o botão de reiniciar pesca
    let botaoReiniciarPesca =  document.getElementById('botao');

    // Faz o botão de pesca sumir
    botaoReiniciarPesca.style.display = 'none';



}

// Função rodada ao apertar o botão de cancelar na área de decisão de destino
function cancelar(){

    // Retira o blur e o menu de escolha
    blurFilter.style.display = 'none';

}