const API_URL = "http://localhost:5101/api/vendas/relatorio";

// Função para carregar o relatório de vendas
async function carregarRelatorio() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error('Erro ao carregar o relatório de vendas');
        }

        const vendas = await resposta.json(); // Obtém os dados do relatório

        const tabelaCorpo = document.getElementById('reportTable');
        tabelaCorpo.innerHTML = ''; // Limpa o conteúdo da tabela antes de adicionar novos dados

        vendas.forEach(venda => {
            const linha = document.createElement('tr');

            const dataVenda = new Date(venda.dataVenda);
            const dataFormatada = dataVenda.toLocaleDateString('pt-BR');

            linha.innerHTML = `
                <td>${venda.idVenda}</td>
                <td>${venda.nomeProduto}</td>
                <td>${venda.quantidade}</td>
                <td>R$ ${venda.preco.toFixed(2)}</td>
                <td>${dataFormatada}</td>
                <td>${venda.metodoPagamento}</td>
            `;

            tabelaCorpo.appendChild(linha); // Adiciona a linha na tabela
        });
    } catch (error) {
        console.error("Erro ao carregar o relatório:", error);
    }
}

// Carrega o relatório assim que a página é carregada
document.addEventListener("DOMContentLoaded", carregarRelatorio);
