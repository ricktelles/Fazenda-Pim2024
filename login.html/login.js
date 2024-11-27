// script.js

// Seleciona os elementos do DOM
const emailInput = document.querySelector('.email input'); // Seleciona o campo de e-mail
const passwordInput = document.querySelector('.senha input'); // Seleciona o campo de senha
const submitButton = document.querySelector('.entrar input[type="submit"]'); // Seleciona o botão de envio
const messageDiv = document.createElement('div'); // Cria um elemento para mensagens

// Estiliza a div de mensagens
messageDiv.style.color = 'red'; // Define a cor das mensagens como vermelho
messageDiv.style.textAlign = 'center'; // Centraliza o texto
messageDiv.style.marginTop = '10px'; // Adiciona margem superior

// Adiciona a div de mensagens ao DOM
document.querySelector('.caixa').appendChild(messageDiv);

// Adiciona um evento de escuta ao botão de envio
submitButton.addEventListener('click', function(event) {
    // Evita o comportamento padrão do botão de envio
    event.preventDefault();

    // Obtém os valores dos campos
    const email = emailInput.value; // Obtém o valor do campo de e-mail
    const password = passwordInput.value; // Obtém o valor do campo de senha

    // Chama a função de validação
    const validationResult = validateLogin(email, password);

    // Limpa mensagens anteriores
    messageDiv.textContent = '';

    // Verifica o resultado da validação
    if (validationResult === true) {
        messageDiv.textContent = 'Login bem-sucedido!'; // Mensagem de sucesso
        messageDiv.style.color = 'green'; // Altera a cor para verde
        // Aqui você pode redirecionar o usuário ou realizar outra ação
    } else {
        // Exibe mensagem de erro
        messageDiv.textContent = validationResult; // Exibe a mensagem de erro retornada pela validação
    }
});

// Função de validação do login
function validateLogin(email, password) {
    // Exemplo de credenciais válidas (isso deve ser feito no backend em um ambiente real)
    const validEmail = 'usuario@exemplo.com'; // E-mail válido
    const validPassword = 'senha123'; // Senha válida

    // Verifica se o e-mail é válido
    if (email !== validEmail) {
        return 'E-mail não encontrado. Por favor, faça o cadastro.'; // Retorna mensagem se o e-mail não for encontrado
    }

    // Verifica se a senha está correta
    if (password !== validPassword) {
        return 'Senha inválida. Tente novamente.'; // Retorna mensagem se a senha estiver errada
    }

    // Retorna true se ambos estiverem corretos
    return true;
}
