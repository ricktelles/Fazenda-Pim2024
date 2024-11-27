// Seleciona o formulário pelo ID
const form = document.getElementById('cadastro');

// Adiciona um evento de 'submit' ao formulário
form.addEventListener('submit', function(event) {
    // Previne o comportamento padrão do formulário (envio)
    event.preventDefault();

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('endereco').value;
    const tipoProduto = document.getElementById('tipo-produto').value;

    // Validação simples (exemplo)
    if (nome && email && endereco && tipoProduto) {
        alert('Fornecedor cadastrado com sucesso!'); // Mensagem de sucesso
        // Aqui você poderia enviar os dados para um servidor ou processá-los
        form.reset(); // Limpa os campos do formulário
    } else {
        alert('Por favor, preencha todos os campos.'); // Mensagem de erro
    }
});
