// Exercício 2: Cadastro de Produto

function criarProduto(dados) {
  if (!dados.nome) {
    throw new Error("Nome é obrigatório");
  }

  if (typeof dados.preco !== "number" || dados.preco <= 0) {
    throw new Error("Preço deve ser um número maior que zero");
  }

  if (typeof dados.estoque !== "number" || dados.estoque < 0 || !Number.isInteger(dados.estoque)) {
    throw new Error("Estoque deve ser um número inteiro maior ou igual a zero");
  }

  return {
    nome: dados.nome,
    preco: dados.preco,
    estoque: dados.estoque
  };
}

// Testes
console.log("=== Exercício 2: Cadastro de Produto ===\n");

// Teste 1: produto válido
try {
  const produto = criarProduto({ nome: "Notebook", preco: 2500, estoque: 10 });
  console.log("Produto válido criado:", produto);
} catch (error) {
  console.log(`Erro: ${error.message}`);
}

// Teste 2: produto sem nome
try {
  const produto = criarProduto({ preco: 100, estoque: 5 });
  console.log("Produto criado:", produto);
} catch (error) {
  console.log(`Produto sem nome -> Erro: ${error.message}`);
}

// Teste 3: produto com preço negativo
try {
  const produto = criarProduto({ nome: "Mouse", preco: -50, estoque: 10 });
  console.log("Produto criado:", produto);
} catch (error) {
  console.log(`Preço negativo -> Erro: ${error.message}`);
}

// Teste 4: produto com estoque quebrado
try {
  const produto = criarProduto({ nome: "Teclado", preco: 200, estoque: 1.5 });
  console.log("Produto criado:", produto);
} catch (error) {
  console.log(`Estoque 1.5 -> Erro: ${error.message}`);
}