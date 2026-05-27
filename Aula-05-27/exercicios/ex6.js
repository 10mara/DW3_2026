// Exercício 6: Reescrevendo Código Problemático

function processarPagamento(valor) {
  if (valor <= 0) {
    throw new Error("Valor inválido");
  }

  return "Pagamento aprovado";
}

// Testes
console.log("=== Exercício 6: Reescrevendo Código ===\n");

// Teste 1: valor válido
try {
  const resultado = processarPagamento(100);
  console.log(`processarPagamento(100) = "${resultado}"`);
} catch (error) {
  console.log(`Erro: ${error.message}`);
}

// Teste 2: valor zero
try {
  const resultado = processarPagamento(0);
  console.log(`processarPagamento(0) = "${resultado}"`);
} catch (error) {
  console.log(`processarPagamento(0) -> Erro: ${error.message}`);
}

// Teste 3: valor negativo
try {
  const resultado = processarPagamento(-50);
  console.log(`processarPagamento(-50) = "${resultado}"`);
} catch (error) {
  console.log(`processarPagamento(-50) -> Erro: ${error.message}`);
}