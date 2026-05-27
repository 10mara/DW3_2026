// Exercício 3: Erro Personalizado

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function criarProduto(dados) {
  if (!dados.nome) {
    throw new ValidationError("Nome é obrigatório");
  }

  if (typeof dados.preco !== "number" || dados.preco <= 0) {
    throw new ValidationError("Preço deve ser um número maior que zero");
  }

  if (typeof dados.estoque !== "number" || dados.estoque < 0 || !Number.isInteger(dados.estoque)) {
    throw new ValidationError("Estoque deve ser um número inteiro maior ou igual a zero");
  }

  return {
    nome: dados.nome,
    preco: dados.preco,
    estoque: dados.estoque
  };
}

// Testes
console.log("=== Exercício 3: Erro Personalizado ===\n");

// Teste 1: produto válido
try {
  const produto = criarProduto({ nome: "Notebook", preco: 2500, estoque: 10 });
  console.log("Produto válido criado:", produto);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Erro de validação: ${error.message}`);
  } else {
    console.log("Erro inesperado");
  }
}

// Teste 2: ValidationError
try {
  const produto = criarProduto({ preco: 100, estoque: 5 });
  console.log("Produto criado:", produto);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Erro de validação: ${error.message}`);
    console.log(`error.name = ${error.name}`);
    console.log(`error instanceof ValidationError = ${error instanceof ValidationError}`);
  } else {
    console.log("Erro inesperado");
  }
}