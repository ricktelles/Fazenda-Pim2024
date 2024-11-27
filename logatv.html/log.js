// script.js

// Seleciona os elementos do DOM
const addActivityButton = document.getElementById('addActivity'); // Botão para adicionar atividade
const activityTableBody = document.getElementById('activityTableBody'); // Corpo da tabela onde as atividades serão adicionadas

// Adiciona um evento de clique ao botão
addActivityButton.addEventListener('click', function() {
    // Obtém os valores dos inputs
    const descricaoInput = document.getElementById('descricao'); // Descrição da atividade
    const dataHoraInput = document.getElementById('dataHora'); // Data e hora da atividade

    const descricao = descricaoInput.value; // Obtém a descrição
    const dataHora = new Date(dataHoraInput.value); // Obtém a data e hora

    // Verifica se os campos estão preenchidos
    if (descricao && dataHora) {
        // Cria uma nova linha na tabela
        const newRow = document.createElement('tr');

        // Cria e adiciona as células na linha
        const dateCell = document.createElement('td');
        const timeCell = document.createElement('td');
        const descCell = document.createElement('td');

        // Formata a data e hora para serem exibidas
        dateCell.textContent = dataHora.toLocaleDateString('pt-BR');
        timeCell.textContent = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        descCell.textContent = descricao;

        // Adiciona as células na linha
        newRow.appendChild(dateCell);
        newRow.appendChild(timeCell);
        newRow.appendChild(descCell);

        // Adiciona a nova linha ao corpo da tabela
        activityTableBody.appendChild(newRow);

        // Limpa os campos de entrada
        descricaoInput.value = '';
        dataHoraInput.value = '';
    } else {
        alert('Por favor, preencha todos os campos.'); // Alerta caso os campos não estejam preenchidos
    }
});
