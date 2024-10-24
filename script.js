const apiUrl = './db.json'; 

// Função auxiliar para criar um elemento com texto
function createElementWithText(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) {
        element.classList.add(className); // Adiciona uma classe se fornecida
    }
    return element;
}

// Função para criar e inserir os cards dinamicamente
function createProductCard(product) {
    const productList = document.getElementById('product-list');

    const productCard = document.createElement('div');
    productCard.classList.add('product-card'); // Adiciona a classe para o estilo

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title; // Texto alternativo da imagem
    productCard.appendChild(productImage);

    const titleElement = createElementWithText('p', product.title, 'product-title');
    productCard.appendChild(titleElement);

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container'); // Classe para estilização

    const priceElement = createElementWithText('p', `$${product.price.toFixed(2)}`, 'product-price');
    priceContainer.appendChild(priceElement); // Adiciona o preço ao contêiner

    const trashIcon = document.createElement('img');
    trashIcon.src = 'assets/trash.png'; // Caminho para o ícone de lixeira
    trashIcon.alt = 'Remover produto'; // Texto alternativo para acessibilidade
    trashIcon.classList.add('trash-icon'); // Classe para estilização (opcional)
    priceContainer.appendChild(trashIcon);

    trashIcon.addEventListener('click', () => {
        const confirmRemoval = confirm('Confirme para excluir o produto');
        if (confirmRemoval) {
            productList.removeChild(productCard); // Remove o card se o usuário confirmar
        }
    });

    productCard.appendChild(priceContainer);
    return productCard;
}

// Função para fazer a requisição à API e obter os dados dos produtos
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl); // Faz a requisição GET
        const products = await response.json(); // Converte a resposta para JSON

        const productList = document.getElementById('product-list');

        // Loop para repetir os cards 3 vezes
        for (let i = 0; i < 3; i++) {
            products.products.forEach(product => {
                const productCard = createProductCard(product);
                productList.appendChild(productCard);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

fetchProducts();
// Função para limpar o formulário
function clearForm(form) {
    form.reset(); // Limpa todos os campos do formulário
}

// Função para exibir a mensagem de sucesso
function showSuccessMessage() {
    const messageContainer = document.getElementById('success-message');
    messageContainer.textContent = 'Produto adicionado com sucesso!';
    messageContainer.style.display = 'block'; // Mostra a mensagem

    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 3000);
}

// Função para adicionar o produto (simula a criação do card)
function addProductCard(product) {
    const productList = document.getElementById('product-list');

    // Cria o card do produto
    const productCard = document.createElement('div');
    productCard.classList.add('product-card'); // Adiciona a classe para o estilo

    // Imagem do produto
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productCard.appendChild(productImage);

    // Título do produto
    const titleElement = createElementWithText('p', product.title, 'product-title');
    productCard.appendChild(titleElement);

    // Preço do produto e ícone da lixeira
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container'); // Classe para estilização

    const priceElement = createElementWithText('p', `$${product.price.toFixed(2)}`, 'product-price');
    priceContainer.appendChild(priceElement); // Adiciona o preço ao contêiner

    // Ícone da lixeira
    const trashIcon = document.createElement('img');
    trashIcon.src = 'assets/trash.png'; // Caminho para o ícone de lixeira
    trashIcon.alt = 'Remover produto'; // Texto alternativo para acessibilidade
    trashIcon.classList.add('trash-icon'); // Classe para estilização (opcional)

    priceContainer.appendChild(trashIcon); // Adiciona o ícone da lixeira ao preço

    // Event listener para remoção
    trashIcon.addEventListener('click', () => {
        const confirmRemoval = confirm('Você tem certeza que deseja remover este produto?');
        if (confirmRemoval) {
            productList.removeChild(productCard); // Remove o card se o usuário confirmar
        }
    });

    // Adiciona o priceContainer ao productCard
    productCard.appendChild(priceContainer);

    // Adiciona o card à lista de produtos
    const firstProductCard = productList.firstChild;
    if (firstProductCard) {
        productList.insertBefore(productCard, firstProductCard); // Adiciona antes do primeiro card existente
    } else {
        productList.appendChild(productCard); // Ou adiciona ao final se não houver cards
    }
}

// Evento de clique no botão "Salvar"
document.getElementById('btn-save').addEventListener('click', (event) => {
    event.preventDefault();

    const form = document.querySelector('.add-product-form');

    // Captura os dados do formulário
    const product = {
        image: form['product-image'].value,
        title: form['product-name'].value,
        price: parseFloat(form['product-price'].value),
    };

    // Adiciona o card do produto à lista
    addProductCard(product);

    // Exibe a mensagem de sucesso
    showSuccessMessage();

    // Limpa o formulário
    clearForm(form);
});

// Evento de clique no botão "Limpar"
document.getElementById('btn-clear').addEventListener('click', (event) => {
    event.preventDefault();

    // Limpa o formulário
    const form = document.querySelector('.add-product-form');
    clearForm(form);
});
