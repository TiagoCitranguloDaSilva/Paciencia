// export
class Carta {

    _valorNumerico;
    valorSimbolico;
    naipe;
    cartaHTML;

    constructor(valorNumerico, naipe){
        this.naipe = naipe;
        this._valorNumerico = valorNumerico;
        this.definirValorSimbolico();
    }

    definirValorSimbolico(){
        switch(this._valorNumerico){
            case 1:
                this.valorSimbolico = "A";
                break;
            case 11:
                this.valorSimbolico = "J";
                break;
            case 12:
                this.valorSimbolico = "Q";
                break;
            case 13:
                this.valorSimbolico = "K";
                break;
            default:
                this.valorSimbolico = this._valorNumerico.toString();
        }
    }

    criarCartaHTML(classes){
        // Cria a carta como uma section
        let carta = document.createElement('section');

        // Adiciona a classe 'cartas' na carta
        carta.classList.add('cartas');

        // Um for que irá rodar por cada classe extra passada 
        for(let c = 0; c < classes.length; c++){

            // Adiciona a classe extra na carta
            carta.classList.add(classes[c]);

        }

        // Adiciona o naipe vindo dos valores escolhidos nas classes da carta
        carta.classList.add(this.naipe);

        // Se o naipe da carta for preto
        if(this.naipe == 'paus' || this.naipe == 'espada'){

            // Adiciona a classe 'preto' na carta
            carta.classList.add('preto');

        }else{

            // Adiciona a classe 'vermelho' na carta
            carta.classList.add('vermelho');

        }

        // Coloca o onclick na carta que irá chamar a função 'mover' e passará o elemento clicado como parâmetro
        carta.setAttribute('onclick', 'mover(this)');

        // Coloca o valor da carta no texto da carta
        carta.innerHTML = this.valorSimbolico;

        // Adiciona o naipe da carta e o valor dela como id
        carta.id = this.naipe+'-'+this.valorSimbolico;


        // Adiciona um dado extra na carta, o valor dela
        carta.setAttribute('data-content', this.valorSimbolico);

        // Retorna o elemento

        this.cartaHTML = carta;
        return carta;

    }

    devolverCartaHTML(){
        console.log("entrou")
        return this.cartaHTML
    }

}