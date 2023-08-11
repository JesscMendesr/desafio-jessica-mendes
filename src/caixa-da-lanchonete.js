const cardapio = {
    cafe: {
        valor: 'R$ 3,00'
    },
    chantily: {
        valor: 'R$ 1,50',
        extra: ''
    },
    suco: {
        valor: 'R$ 6,20'
    }, 
    sanduiche: {
        valor: 'R$ 6,50'
    },
    queijo: {
        valor: 'R$ 2,00', extra: ''
    },
    salgado: {
        valor: 'R$ 7,25'
    },
    combo1: {
        valor: 'R$ 9,50'
    },
    combo2: {
        valor: 'R$ 7,50'
    }
}

function calcularDescontoTaxa(metodoDePagamento, valorTotal){
    let precoFinal;
    if(metodoDePagamento === 'dinheiro'){
        let desconto;
        desconto = valorTotal * (5 / 100) 
        precoFinal = valorTotal - desconto
    }else if (metodoDePagamento === 'credito'){
        let acrescimo;
        acrescimo = valorTotal * (3 / 100)
        precoFinal = valorTotal + acrescimo
    }
    return precoFinal.toFixed(2)
}

console.log(calcularDescontoTaxa('credito', 5.10))

function verificarItemExtra(item){
    return cardapio[item].hasOwnProperty('extra')
}

verificarItemExtra('chantily')

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        let resposta;
        const pagamentosAceitos = ['dinheiro', 'credito', 'debito']

        if(pagamentosAceitos.hasOwnProperty(metodoDePagamento)){
            if(itens.length !== 0){
                itens.forEach(element => {
                    let item = element.slice(0,element.length - 2)
                    let quantidade = parseInt(element.charAt(element.length - 1))
                    if(quantidade <= 0){
                        resposta = "Quantidade inválida!"
                    }else if((cardapio.hasOwnProperty(item)) === false){
                        resposta = "Item inválido!"
                    }else{

                    }
                    console.log(cardapio.hasOwnProperty(item))
                    console.log(quantidade)
                });
        
            }else{
                resposta = "Não há itens no carrinho de compra!";
            }

        }else{
            resposta = "Forma de pagamento inválida!"
        }

        return '';
    }
    
}

const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra('dinheiro', ['cafe,5','chantily,1']
            );

console.log(resultado)    

export { CaixaDaLanchonete };
