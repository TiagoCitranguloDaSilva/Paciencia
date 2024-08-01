// export
 class Coluna{

    static contColuna;

    colunaHTML;

    _qtdeCartas = 0;

    _cartas = []

    createHTMLElement(elementoPai){

        // Cria a section que vai ser a área em que ficará a coluna
        let areacoluna = document.createElement('section');

        // Adiciona área na mesa
        elementoPai.appendChild(areacoluna);

        // Cria o sinalizador, que é uma section que diz qual é o número da coluna atual
        let sinalizador = document.createElement('section');

        // Adiciona o número da coluna no sinalizador
        sinalizador.innerHTML = Coluna.contColuna;

        // Coloca a classe usada no CSS 'sinalizador'
        sinalizador.classList.add('sinalizador');

        // Coloca o sinalizador na coluna
        areacoluna.appendChild(sinalizador);

        // Cria a coluna como uma section
        let coluna = document.createElement('section');

        // Adiciona o id da coluna como 'coluna' + o numero da coluna. Ex: 'coluna2'
        coluna.id = 'coluna'+(Coluna.contColuna);

        // Adiciona na coluna a classe usada no CSS 'coluna' 
        coluna.classList.add('coluna');

        // Adiciona a coluna na área da coluna
        areacoluna.appendChild(coluna);

        // Pega a coluna que acabou de ser criada
        let colunaAtual = document.getElementById('coluna'+(Coluna.contColuna));

        this.colunaHTML = colunaAtual

    }

    pegarQtdeCartas(){
        return this._qtdeCartas;
    }

    definirQtdeCartas(valor){
        this._qtdeCartas += valor;
    }

    static definirContColuna(valor){
        this.contColuna = valor;

    }

    adicionarCarta(elemento, elementoHTML){
        this._cartas.push([elemento, elementoHTML]);
    }

    adicionarCartaHTML(carta){
        this.colunaHTML.appendChild(carta);
    }

}