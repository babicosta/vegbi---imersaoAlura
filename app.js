function removerAcentos(texto) {
    // Normaliza o texto para decompor caracteres acentuados em caracteres base e marcas de acento
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Função responsável por realizar a pesquisa de receitas.
 * Compara o termo de pesquisa com os nomes das receitas e exibe os resultados.
 */
function pesquisar() {
    // Obtém a seção onde os resultados da pesquisa serão exibidos
    let section = document.getElementById("resultados-pesquisa");
    
    // Obtém o valor do campo de pesquisa e converte para minúsculas
    let campoPesquisa = document.getElementById("campo-pesquisa").value.toLowerCase();
    
    // Remove acentos do termo de pesquisa
    campoPesquisa = removerAcentos(campoPesquisa);

    // Inicializa uma variável para armazenar os resultados da pesquisa
    let resultados = "";

    // Itera sobre cada receita para verificar se corresponde ao termo de pesquisa
    for (let receita of receitas) {
        // Remove acentos do nome da receita e converte para minúsculas
        let nomeReceita = removerAcentos(receita.nome.toLowerCase());

        // Verifica se o nome da receita inclui o termo de pesquisa
        if (nomeReceita.includes(campoPesquisa)) {
            // Concatena o HTML para exibir a receita nos resultados
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="#" target="_blank">${receita.nome}</a>
                </h2>
                <p class="descrição-meta">${receita.ingredientes}</p>
            </div>
            `;
        }
    }

    // Se não houver resultados, exibe uma mensagem apropriada
    if (resultados === "") {
        resultados = "<p>Nenhuma receita encontrada.</p>";
    }

    // Atualiza o conteúdo HTML da seção de resultados com o HTML gerado
    section.innerHTML = resultados;
}

// Adiciona um evento de escuta ao campo de entrada de texto para detectar quando a tecla Enter é pressionada
document.getElementById("campo-pesquisa").addEventListener("keypress", function(event) {
    // Verifica se a tecla pressionada é a tecla Enter
    if (event.key === "Enter") {
        // Executa a função de pesquisa
        pesquisar();
    }
});
