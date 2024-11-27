// cadastroFuncionario.js

// Seleciona os elementos do DOM
const nameInput = document.querySelector('.name input'); // Campo de nome
const emailInput = document.querySelector('.email input'); // Campo de e-mail
const passwordInput = document.querySelectorAll('.senha input'); // Campos de senha (pode ser um array)
const submitButton = document.querySelector('.entrar input[type="submit"]'); // Botão de envio
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
    const name = nameInput.value; // Obtém o valor do campo de nome
    const email = emailInput.value; // Obtém o valor do campo de e-mail
    const password = passwordInput[0].value; // Obtém o valor do primeiro campo de senha
    const confirmPassword = passwordInput[1].value; // Obtém o valor do segundo campo de senha (confirmação)

    // Chama a função de validação
    const validationResult = validateSignup(name, email, password, confirmPassword);

    // Limpa mensagens anteriores
    messageDiv.textContent = '';

    // Verifica o resultado da validação
    if (validationResult === true) {
        messageDiv.textContent = 'Cadastro realizado com sucesso!'; // Mensagem de sucesso
        messageDiv.style.color = 'green'; // Altera a cor para verde
        // Aqui você pode redirecionar o usuário ou realizar outra ação
    } else {
        // Exibe mensagem de erro
        messageDiv.textContent = validationResult; // Exibe a mensagem de erro retornada pela validação
        messageDiv.style.color = 'red'; // Altera a cor para vermelho
    }
});

// Função de validação do cadastro
function validateSignup(name, email, password, confirmPassword) {
    // Verifica se o nome é fornecido
    if (!name) {
        return 'O nome é obrigatório.'; // Mensagem de erro
    }

    // Verifica se o e-mail é fornecido
    if (!email) {
        return 'O e-mail é obrigatório.'; // Mensagem de erro
    }

    // Verifica se a senha tem pelo menos 8 caracteres
    if (password.length < 8) {
        return 'A senha deve ter pelo menos 8 caracteres.'; // Mensagem de erro
    }

    // Verifica se a senha e a confirmação de senha são iguais
    if (password !== confirmPassword) {
        return 'As senhas não coincidem. Tente novamente.'; // Mensagem de erro
    }

    // Retorna true se todos os critérios forem atendidos
    return true;
}
