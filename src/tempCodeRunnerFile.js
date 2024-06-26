const prompt = require('prompt-sync')({ sigint: true });

// Criei esse array para funcionar como armazenamento da mesa do restaurante
let mesa = [];

// SEGUNDA TELA - Função para adicionar um cliente e valor total de sua comanda

function adicionarCliente() {
    let nome = prompt(" INFORME O NOME DO CLIENTE: ");
    let comanda = parseFloat(prompt(" INFORME O VALOR DA COMANDA: "));  //utilizei o parseFloat para converter a string em numero decimal

    // Pedir ao usuário que informe a forma de pagamento
    let formaPagamento = prompt(" INFORME A FORMA DE PAGAMENTO (PIX, CARTÃO OU DINHEIRO): ");

    // Verificar a forma de pagamento e calcular o valor total com desconto, se aplicável
    if (formaPagamento.toLowerCase() === "pix" || formaPagamento.toLowerCase() === "dinheiro") { // o uso do método toLowerCase é para garantir que o usuário possa digitar entre minúsculas e maiúsculas.
        comanda *= 0.9; // Esse cálculo fará com que o desconto de 10% seja aplicado
    }

    //Não será necessário incluir um "else" já que o valor da comanda já foi definido anteriormente.

    // Calcula o subtotal do valor declarado
    let subtotal = comanda;

    // Adiciona o cliente, o valor da comanda e calcula o valor da mesa
    mesa.push({ nome, comanda, subtotal });

    console.log(`Valor total de sua comanda é: R$ ${comanda.toFixed(2)} \n`);
}

// Função para exibir os clientes registrados à mesa e consumo total
function exibirMesa() {
    let mensagem = "CLIENTES REGISTRADOS NA MESA:\n";

    // Itera sobre os clientes na mesa
    mesa.forEach(cliente => {
        mensagem += `\nNome: ${cliente.nome}\n`;
        mensagem += `Valor total da Comanda: R$ ${cliente.comanda.toFixed(2)}\n`;
        mensagem += `Subtotal: R$ ${cliente.subtotal.toFixed(2)}\n`;
    });

    // Para calcular o valor total da compra
    let total = mesa.reduce((acc, cliente) => acc + cliente.subtotal, 0); //Dica do Tiago: pesquisar reduce, map e filter para entender

    mensagem += `\n-----> CONSUMO TOTAL DA MESA: R$ ${total.toFixed(2)} <-----\n`;

    console.log(mensagem);
}

// Função para adicionar gorjeta de 10% ao valor total da comanda de cada cliente
function adicionarGorgeta() {
    mesa.forEach(cliente => {
        let gorjeta = cliente.comanda * 0.1; // Calcula a gorjeta (10% do valor total da comanda)
        cliente.comanda += gorjeta; // Adiciona a gorjeta ao valor total da comanda
        cliente.subtotal += gorjeta; // Atualiza o subtotal do cliente
    });

    console.log("Gorjeta de 10% adicionada a todas as comandas.");
}