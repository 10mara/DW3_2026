// Exercício 4: Busca de Usuário

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

const usuarios = [
  { id: 1, nome: "Ana" },
  { id: 2, nome: "Bruno" },
  { id: 3, nome: "Carla" }
];

function buscarUsuarioPorId(id) {
  if (typeof id !== "number") {
    throw new ValidationError("ID deve ser um número");
  }

  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    throw new NotFoundError("Usuário não encontrado");
  }

  return usuario;
}

// Testes
console.log("=== Exercício 4: Busca de Usuário ===\n");

// Teste 1: usuário existente
try {
  const usuario = buscarUsuarioPorId(1);
  console.log(`buscarUsuarioPorId(1) =`, usuario);
} catch (error) {
  console.log(`Erro: ${error.message}`);
}

// Teste 2: ID como string (ValidationError)
try {
  const usuario = buscarUsuarioPorId("1");
  console.log(`buscarUsuarioPorId("1") =`, usuario);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`buscarUsuarioPorId("1") -> ValidationError: ${error.message}`);
  }
}

// Teste 3: usuário inexistente (NotFoundError)
try {
  const usuario = buscarUsuarioPorId(99);
  console.log(`buscarUsuarioPorId(99) =`, usuario);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log(`buscarUsuarioPorId(99) -> NotFoundError: ${error.message}`);
  }
}