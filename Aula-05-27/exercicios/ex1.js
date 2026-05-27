// Exercício 1: Divisão Segura

function dividir(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Os valores devem ser números");
  }

  if (b === 0) {
    throw new Error("Não é possível dividir por zero");
  }

  return a / b;
}

// Testes
console.log("=== Exercício 1: Divisão Segura ===\n");

// Teste 1: divisão válida
try {
  const resultado = dividir(10, 2);
  console.log(`dividir(10, 2) = ${resultado}`);
} catch (error) {
  console.log(`Erro: ${error.message}`);
}

// Teste 2: divisão por zero
try {
  const resultado = dividir(10, 0);
  console.log(`dividir(10, 0) = ${resultado}`);
} catch (error) {
  console.log(`dividir(10, 0) -> Erro: ${error.message}`);
}

// Teste 3: valor não numérico
try {
  const resultado = dividir("10", 2);
  console.log(`dividir("10", 2) = ${resultado}`);
} catch (error) {
  console.log(`dividir("10", 2) -> Erro: ${error.message}`);
}