// Seleciona o formulário pelo ID
const form = document.getElementById('cadastro-produto');

// Função para buscar fornecedores e preencher o select
function carregarFornecedores() {
    fetch('https://seu-endereco-api.com/fornecedores')  // Substitua pela URL da sua API
        .then(response => response.json())
        .then(data => {
            const selectFornecedor = document.getElementById('fornecedor');
            // Adiciona a opção padrão
            const optionDefault = document.createElement('option');
            optionDefault.value = '';
            optionDefault.textContent = 'Selecione o Fornecedor';
            selectFornecedor.appendChild(optionDefault);

            // Preenche o select com os fornecedores
            data.forEach(fornecedor => {
                const option = document.createElement('option');
                option.value = fornecedor.id; // Substitua pelo campo correto do seu banco
                option.textContent = fornecedor.nome; // Substitua pelo campo correto do seu banco
                selectFornecedor.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar fornecedores:', error));
}

// Carregar fornecedores ao carregar a página
window.onload = carregarFornecedores;

// Adiciona um evento de 'submit' ao formulário
form.addEventListener('submit', function(event) {
    // Previne o comportamento padrão do formulário (envio)
    event.preventDefault();

    // Obtém os valores dos campos do formulário
    const nomeProduto = document.getElementById('nome-produto').value;
    const quantidade = document.getElementById('quantidade').value;
    const qualidade = document.getElementById('qualidade').value;
    const categoria = document.getElementById('categoria').value;
    const dataColheita = document.getElementById('data-colheita').value;
    const destino = document.getElementById('destino').value;
    const fornecedor = document.getElementById('fornecedor').value;

    // Validação simples (exemplo)
    if (nomeProduto && quantidade && qualidade && categoria && dataColheita && destino && fornecedor) {
        alert('Produto cadastrado com sucesso!'); // Mensagem de sucesso
        // Aqui você poderia enviar os dados para um servidor ou processá-los
        form.reset(); // Limpa os campos do formulário
    } else {
        alert('Por favor, preencha todos os campos.'); // Mensagem de erro
    }
});

// Seleciona o botão "Limpar Campos"
const limparCampos = document.getElementById('limpar-campos');

// Adiciona um evento de 'click' ao botão
limparCampos.addEventListener('click', function() {
    form.reset(); // Limpa todos os campos do formulário
});

// Seleciona o botão "Adicionar Categoria"
const adicionarCategoria = document.getElementById('adicionar-categoria');

// Adiciona um evento de 'click' ao botão
adicionarCategoria.addEventListener('click', function() {
    alert('Categoria adicionada (exemplo)!'); // Mensagem de exemplo
});
