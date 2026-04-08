const tarefaModel = require("./model/tarefa.model.js");

// Listar todas as tarefas
async function listarTarefas(request, reply) {
  const filtros = {
    concluida: request.query.concluida,
    busca: request.query.busca,
  };

  const tarefas = tarefaModel.listarTarefas(filtros);
  return reply.send(tarefas);
}

// Criar nova tarefa
async function criarTarefa(request, reply) {
  const { titulo, descricao } = request.body;

  // Validacao
  if (!titulo || titulo.trim() === "") {
    return reply.status(400).send({ erro: "Titulo e obrigatorio" });
  }

  const novaTarefa = tarefaModel.criar({ titulo, descricao });
  return reply.status(201).send(novaTarefa);
}

// Obter tarefa por ID
async function obterTarefa(request, reply) {
  const { id } = request.params;
  const tarefa = tarefaModel.buscarPorId(Number(id));

  if (!tarefa) {
    return reply.status(404).send({ erro: "Tarefa nao encontrada" });
  }

  return reply.send(tarefa);
}

// Atualizar tarefa
async function atualizarTarefa(request, reply) {
  const { id } = request.params;
  const dados = request.body;

  const tarefa = tarefaModel.atualizar(Number(id), dados);

  if (!tarefa) {
    return reply.status(404).send({ erro: "Tarefa nao encontrada" });
  }

  return reply.send(tarefa);
}

// Remover tarefa
async function removerTarefa(request, reply) {
  const { id } = request.params;
  const removida = tarefaModel.remover(Number(id));

  if (!removida) {
    return reply.status(404).send({ erro: "Tarefa nao encontrada" });
  }

  return reply.status(204).send();
}

// Concluir/Desconcluir tarefa
async function concluirTarefa(request, reply) {
  const { id } = request.params;
  const tarefa = tarefaModel.alternarConclusao(Number(id));

  if (!tarefa) {
    return reply.status(404).send({ erro: "Tarefa nao encontrada" });
  }

  return reply.send(tarefa);
}

// Obter resumo das tarefas
async function obterResumo(request, reply) {
  const resumo = tarefaModel.obterResumo();
  return reply.send(resumo);
}

module.exports = {
  listarTarefas,
  criarTarefa,
  obterTarefa,
  atualizarTarefa,
  removerTarefa,
  concluirTarefa,
  obterResumo,
};