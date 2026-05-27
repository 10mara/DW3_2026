// Exercício 7: Validação com Vários Erros

class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

function validarAluno(aluno) {
  const erros = [];

  if (!aluno.nome) {
    erros.push("Nome é obrigatório");
  }

  if (!aluno.email || !aluno.email.includes("@")) {
    erros.push("Email deve conter @");
  }

  if (typeof aluno.idade !== "number" || aluno.idade < 16) {
    erros.push("Idade deve ser maior ou igual a 16");
  }

  if (erros.length > 0) {
    throw new ValidationError("Dados do aluno inválidos", erros);
  }

  return true;
}

// Testes
console.log("=== Exercício 7: Validação com Vários Erros ===\n");

// Teste 1: aluno válido
try {
  const resultado = validarAluno({
    nome: "João",
    email: "joao@email.com",
    idade: 20
  });
  console.log("Aluno válido:", resultado);
} catch (error) {
  console.log(`Erro: ${error.message}`);
}

// Teste 2: aluno com vários erros
try {
  const resultado = validarAluno({
    nome: "",
    email: "emailsemarroba",
    idade: 15
  });
  console.log("Aluno válido:", resultado);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`ValidationError: ${error.message}`);
    console.log("Detalhes dos erros:");
    error.details.forEach((detalhe, index) => {
      console.log(`  ${index + 1}. ${detalhe}`);
    });
  }
}