// Exercício 5: Simulando Operação Assíncrona

async function buscarPedido(id) {
  if (!id) {
    throw new Error("ID do pedido é obrigatório");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (id !== 1) {
    throw new Error("Pedido não encontrado");
  }

  return { id: 1, total: 150 };
}

async function executar() {
  console.log("=== Exercício 5: Operação Assíncrona ===\n");

  // Teste 1: pedido existente
  try {
    console.log("Buscando pedido 1...");
    const pedido = await buscarPedido(1);
    console.log("Pedido encontrado:", pedido);
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  }

  // Teste 2: pedido inexistente
  try {
    console.log("\nBuscando pedido 99...");
    const pedido = await buscarPedido(99);
    console.log("Pedido encontrado:", pedido);
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  }

  // Teste 3: sem ID
  try {
    console.log("\nBuscando pedido sem ID...");
    const pedido = await buscarPedido();
    console.log("Pedido encontrado:", pedido);
  } catch (error) {
    console.log(`Erro: ${error.message}`);
  }
}

executar();