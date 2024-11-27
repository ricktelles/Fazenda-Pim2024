// URL da API
const API_URL = "http://localhost:5101/api/Produto";

// Função para carregar os produtos na tabela
// Função para carregar os produtos na tabela
async function carregarProdutos() {
    try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) throw new Error("Erro ao carregar os produtos.");

        const produtos = await resposta.json();
        const tabelaCorpo = document.querySelector("tbody");
        tabelaCorpo.innerHTML = "";

        produtos.forEach(produto => {
            const linha = document.createElement("tr");

            // Adiciona o atributo 'data-id-produto' à linha
            linha.setAttribute("data-id-produto", produto.idProduto); // Supondo que 'idProduto' seja o campo correto

            linha.innerHTML = `
            <td>${produto.nomeProduto}</td>
            <td>${produto.qtdProduto}</td>
            <td>${produto.qualidadeProduto}</td>
            <td>${produto.categoriaProduto}</td>
            <td>${new Date(produto.dataColheita).toLocaleDateString('pt-BR')}</td>
            <td>${produto.destinoProduto}</td>
            <td>${produto.nomeFornecedor}</td>
            <td>
                <button class="btn-action" onclick="abrirModalVenda(this)">Vender</button>
                <button class="btn-action" onclick="abrirModalEditar(this)">Editar</button> <!-- Chama a função de editar -->
                <button class="btn-action" onclick="excluirProduto(${produto.idProduto})">Excluir</button>
            </td>
        `;
        

            tabelaCorpo.appendChild(linha);
        });
    } catch (error) {
        console.error("Erro:", error);
    }
}

// Função para abrir o modal e exibir informações do produto
function abrirModalVenda(botao) {
    const linha = botao.closest("tr");
    const colunas = linha.querySelectorAll("td");

    const nomeProduto = colunas[0].textContent;
    const quantidadeDisponivel = colunas[1].textContent;

    // Exibe as informações no modal
    document.getElementById("produto-selecionado").textContent =
        `Produto: ${nomeProduto}, Quantidade disponível: ${quantidadeDisponivel}`;

    // Acesse os campos do modal
    const quantidadeInput = document.getElementById("quantidade");
    const precoUnitarioInput = document.getElementById("precoUnitario");

    // Certifique-se de que os elementos existem no DOM
    if (quantidadeInput && precoUnitarioInput) {
        quantidadeInput.value = "";  // Limpa o campo de quantidade
        precoUnitarioInput.value = "";  // Limpa o campo de preço unitário
    }

    // Atribui o ID do produto ao campo oculto no formulário
    const idProduto = linha.getAttribute("data-id-produto");
    document.getElementById("idProduto").value = idProduto;

    // Armazene a quantidade disponível no campo oculto
    const idProdutoInput = document.getElementById("idProduto");
    idProdutoInput.setAttribute("data-quantidade", quantidadeDisponivel);

    // Exibe o modal
    const modal = document.getElementById("modal-venda");
    modal.style.display = "block";
}



// Função para fechar o modal
function fecharModalVenda() {
    const modal = document.getElementById("modal-venda");
    modal.style.display = "none";
}

// Função para realizar a venda
async function venderProduto() {
    const form = document.getElementById("form-venda");

    // Pegue a quantidade disponível armazenada no campo oculto
    const quantidadeDisponivel = parseInt(document.getElementById("idProduto").getAttribute("data-quantidade"));
    
    const quantidadeSolicitada = parseInt(form.quantidade.value);
    
    // Validação para garantir que a quantidade solicitada não exceda a quantidade disponível
    if (quantidadeSolicitada > quantidadeDisponivel) {
        alert("Quantidade solicitada excede a quantidade disponível no estoque.");
        return;  // Impede o envio da venda
    }

    const vendaRequest = {
        IdProduto: parseInt(form.idProduto.value), // Agora o IdProduto é extraído do modal
        Quantidade: parseInt(form.quantidade.value),
        PrecoUnitario: parseFloat(form.precoUnitario.value),
        MetodoPagamento: form.metodoPagamento.value,
    };

    console.log("Dados enviados para o backend:", vendaRequest);

    try {
        const response = await fetch("http://localhost:5101/api/Vendas/vender", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vendaRequest),
        });

        if (!response.ok) throw new Error("Erro ao realizar a venda.");
        alert("Venda realizada com sucesso!");
        fecharModalVenda();
        carregarProdutos(); // Atualiza a tabela após a venda
    } catch (error) {
        console.error("Erro ao vender o produto:", error);
        alert("Erro ao realizar a venda.");
    }
}

function abrirModalEditar(botao) {
    const linha = botao.closest("tr");
    const colunas = linha.querySelectorAll("td");

    const nomeProduto = colunas[0].textContent;
    const quantidadeProduto = colunas[1].textContent;
    const qualidadeProduto = colunas[2].textContent;
    const categoriaProduto = colunas[3].textContent;
    const destinoProduto = colunas[4].textContent;
    const fornecedorProduto = colunas[5].textContent;

    // Atribui o ID do produto
    const idProduto = linha.getAttribute("data-id-produto");
    console.log("ID Produto:", idProduto);  // Verifique se o ID está sendo atribuído corretamente

    // Preenche os campos de edição com os dados do produto
    document.getElementById('editar-idProduto').value = produto.idProduto;
    document.getElementById('editar-nomeProduto').value = produto.nomeProduto;
    document.getElementById('editar-quantidadeProduto').value = produto.qtdProduto;
    document.getElementById('editar-qualidadeProduto').value = produto.qualidadeProduto;
    document.getElementById('editar-categoriaProduto').value = produto.categoriaProduto;
    document.getElementById('editar-dataColheita').value = produto.dataColheita.split('T')[0]; // Apenas a data no formato YYYY-MM-DD
    document.getElementById('editar-destinoProduto').value = produto.DestinoProduto;
    document.getElementById('editar-fornecedorProduto').value = produto.NomeFornecedor;

    // Atribui o ID do produto para poder editar
    document.getElementById("editar-idProduto").value = idProduto;

    const modalEditar = document.getElementById("modal-editar");
    modalEditar.style.display = "block";
}


// Função para fechar o modal
function fecharModalEditar() {
    const modalEditar = document.getElementById("modal-editar");
    modalEditar.style.display = "none";
}

function validarDataColheita(dataColheita) {
    // Definindo o intervalo de datas válidas
    const dataMinima = new Date(1753, 0, 1); // 1º de janeiro de 1753
    const dataMaxima = new Date(9999, 11, 31); // 31 de dezembro de 9999

    // Convertendo a data recebida para um objeto Date
    const data = new Date(dataColheita);

    // Verificando se a data está dentro do intervalo válido
    if (data < dataMinima || data > dataMaxima) {
        alert('A data de colheita está fora do intervalo permitido (entre 1/1/1753 e 31/12/9999).');
        return false; // Retorna falso se a data for inválida
    }

    return true; // Retorna verdadeiro se a data for válida
}


async function atualizarProduto() {
    const form = document.getElementById("form-editar");

    // Acessar os campos de entrada corretamente
    const nomeProduto = document.getElementById("editar-nomeProduto").value;
    const quantidadeProduto = parseInt(document.getElementById("editar-quantidadeProduto").value);
    const qualidadeProduto = document.getElementById("editar-qualidadeProduto").value;
    const categoriaProduto = document.getElementById("editar-categoriaProduto").value;
    const destinoProduto = document.getElementById("editar-destinoProduto").value;  // Confirmado como texto
    const fornecedorProduto = document.getElementById("editar-fornecedorProduto").value;  // Nome do fornecedor
    const idProduto = parseInt(document.getElementById("editar-idProduto").value);

    // Verificando os dados coletados
    console.log("Produto a ser atualizado:", {
        idProduto,
        nomeProduto,
        quantidadeProduto,
        qualidadeProduto,
        categoriaProduto,
        destinoProduto,
        fornecedorProduto
    });

    const produtoRequest = {
        IdProduto: idProduto,
        NomeProduto: nomeProduto,
        QtdProduto: quantidadeProduto,
        QualidadeProduto: qualidadeProduto,
        CategoriaProduto: categoriaProduto,
        DestinoProduto: destinoProduto,  // Passando destino como texto
        NomeFornecedor: fornecedorProduto  // Passando nome do fornecedor
    };

    try {
        const response = await fetch(`http://localhost:5101/api/Produto/${produtoRequest.IdProduto}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produtoRequest)
        });

        if (!response.ok) throw new Error("Erro ao atualizar o produto.");
        alert("Produto atualizado com sucesso!");
        fecharModalEditar();
        carregarProdutos();  // Atualiza a tabela após a edição
    } catch (error) {
        console.error("Erro ao editar o produto:", error);
        alert("Erro ao editar o produto.");
    }
}



// Carrega os produtos ao carregar a página
document.addEventListener("DOMContentLoaded", carregarProdutos);
