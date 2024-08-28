
class AreaPesca{

    _cartas = []
    _cartasTransicao = []
    elementoHTML = document.getElementById("pesca")
    cartaAmostra = null


    adicionarCarta(Carta){

        this._cartas.push(Carta)

    }

    devolverCartas(){
        return this._cartas;
    }

    haCartaAmostra(){
        if(this.cartaAmostra === null){
            return false;
        }else{
            return true;
        }
    }

    removerCartaAmostra(){
        if(this.haCartaAmostra){
            this.cartaAmostra == null
            console.log(this.elementoHTML)
            this.elementoHTML.children[2].remove()
        }
    }

    mostrarCarta(carta){

        this.cartaAmostra = carta

    }

    devolverQtdeCartas(){
        return this._cartas.length;
    }

    devolverQtdeCartasTransicao(){
        return this._cartasTransicao.length
    }

    pescar(){
        this._cartasTransicao.push(this._cartas[0]);

        this._cartas.splice(0, 1);

        let cartaHTML = this._cartasTransicao[this.devolverQtdeCartasTransicao() - 1].criarCartaHTML();

        this.elementoHTML.appendChild(cartaHTML);
        if(!this.haCartaAmostra()){
            this.mostrarCarta(this._cartasTransicao[this.devolverQtdeCartasTransicao() - 1])
        }
    }

}