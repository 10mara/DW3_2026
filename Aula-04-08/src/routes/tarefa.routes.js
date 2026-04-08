const tarefaController = require("./controller/tarefa.controller.js");

async function tarefaRoutes(fastify, options) {
  // GET /tarefas - Listar todas as tarefas
  fastify.get("/tarefas", tarefaController.listarTarefas);

  // POST /tarefas - Criar nova tarefa
  fastify.post("/tarefas", tarefaController.criarTarefa);

  // GET /tarefas/resumo - Obter resumo (ANTES da rota com :id)
  fastify.get("/tarefas/resumo", tarefaController.obterResumo);

  // GET /tarefas/:id - Obter tarefa por ID
  fastify.get("/tarefas/:id", tarefaController.obterTarefa);

  // PATCH /tarefas/:id - Atualizar tarefa
  fastify.patch("/tarefas/:id", tarefaController.atualizarTarefa);

  // DELETE /tarefas/:id - Remover tarefa
  fastify.delete("/tarefas/:id", tarefaController.removerTarefa);

  // PATCH /tarefas/:id/concluir - Alternar conclusao
  fastify.patch("/tarefas/:id/concluir", tarefaController.concluirTarefa);
}

module.exports = tarefaRoutes;