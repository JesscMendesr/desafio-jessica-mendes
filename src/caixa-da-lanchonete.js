const cardapio = {
    cafe: {
        valor: 3.00,
        principal: ''
    },
    chantily: {
        valor: 1.50,
        extra: ''
    },
    suco: {
        valor: 6.20
    }, 
    sanduiche: {
        valor: 6.50,
        principal: ''
    },
    queijo: {
        valor: 2.00, 
        extra: ''
    },
    salgado: {
        valor: 7.25
    },
    combo1: {
        valor: 9.50
    },
    combo2: {
        valor: 7.50
    }
}
// Função para calcular valor da taxa ou desconto, caso houver.
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
    }else{
        precoFinal = valorTotal
    }
    return precoFinal.toFixed(2)
}

// Função para verificar se existe algum item extra.
function verificarItemExtra(item){
    return cardapio[item].hasOwnProperty('extra')
}

// Função para validar o método de pagamento
function validarFormaDePagamento(metodoDePagamento){
    const pagamentosAceitos = ['dinheiro', 'credito', 'debito']
    return pagamentosAceitos.includes(metodoDePagamento)
}

// Função para verificar se existe item principal na lista de Itens.
function validarItemPrincipal(listaDeItens, itemExtra){
    let count = 0

    if(itemExtra === 'chantily'){
        listaDeItens.forEach(item =>{
            if(item[0] === 'cafe'){
                count++
            }
        })
    }else if (itemExtra === 'queijo'){
        listaDeItens.forEach(item =>{
            if(item[0] === 'sanduiche'){
                count++
            }
        })
    }
    return count > 0
}


// função para calcular o valor total dos itens
function calcularValorFinal(listaDeItens){
    let valorFinal = 0
    listaDeItens.forEach(item => {
    let nomeItem = item[0]
    valorFinal += parseFloat((cardapio[nomeItem].valor) * item[1])
    })
    return parseFloat(valorFinal.toFixed(2))
}

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        let resposta;
        let novaLista = []

    if(itens.length !== 0){
        if(validarFormaDePagamento(metodoDePagamento)){
            itens.forEach(element => {
                let item = element.slice(0,element.length - 2)
                let quantidade = parseInt(element.charAt(element.length - 1))
                novaLista.push([item, quantidade])

                if(quantidade <= 0){
                    resposta = "Quantidade inválida!"
                }else if((cardapio.hasOwnProperty(item)) === false){
                    resposta = "Item inválido!"
                }else{
                    if(verificarItemExtra(item)){
                        if(validarItemPrincipal(novaLista, item)){
                            let valorTotal = calcularDescontoTaxa(metodoDePagamento, calcularValorFinal(novaLista))
                            resposta = `R$ ${valorTotal.toString().replace('.', ',')}`
                        }else{
                            resposta = "Item extra não pode ser pedido sem o principal";
                        }
                    }else{
                        if(itens.length === 2){
                            if((item === 'saunduiche' && itens.includes('chantily')) || ((item === 'cafe' && itens.includes('queijo')))){
                                resposta = "Item extra não pode ser pedido sem o principal";
                            }
                        }else{
                            let valorTotal = calcularDescontoTaxa(metodoDePagamento, calcularValorFinal(novaLista))
                            resposta = `R$ ${valorTotal.toString().replace('.', ',')}`
                        }
                    }
                }
            });
        }else{
            resposta = "Forma de pagamento inválida!"
        }
    }else{
        resposta = "Não há itens no carrinho de compra!"
    } 

        return resposta;
    }
    
}

const resultado = new CaixaDaLanchonete()
               .calcularValorDaCompra('dinheiro', ['chantily,1', 'sanduiche,1']); // 'R$ 33,73'

console.log(resultado)    


export { CaixaDaLanchonete };
