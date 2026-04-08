// @file: src/controllers/tarefa.controller.js

import {
  listar,
  criar,
  buscarPorId,
  atualizar,
  alternarConcluido,
  remover,
  obterResumo as obterResumoModel,
  listarPendentes as listarPendentesModel
} from '../models/tarefa.model.js'

// Processa requisições da rota `GET /tarefas`
export async function listarTarefas(request, reply) {
  console.log("Controller: listarTarefas chamado")

  const { busca, concluido } = request.query
  const resultado = await listar({ busca, concluido })

  return reply.send(resultado)
}

// Processa requisições da rota `POST /tarefas`
export async function criarTarefa(request, reply) {
  console.log("Controller: criarTarefa chamado")

  const { descricao } = request.body
  if (!descricao || descricao.trim() === '') {
    return reply.status(400).send({
      status: 'error',
      message: 'A descrição da tarefa é obrigatória'
    })
  }

  const novaTarefa = await criar(descricao)
  return reply.status(201).send(novaTarefa)
}

// Processa requisições da rota `GET /tarefas/resumo`
export async function obterResumo(request, reply) {
  console.log("Controller: obterResumo chamado")

  const resumo = await obterResumoModel()
  return reply.send(resumo)
}

// Processa requisições da rota `GET /tarefas/:id`
export async function obterTarefa(request, reply) {
  console.log("Controller: obterTarefa chamado")

  const id = Number(request.params.id)
  const tarefa = await buscarPorId(id)

  if (!tarefa) {
    return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  return reply.send(tarefa)
}

// Processa requisições da rota `PATCH /tarefas/:id`
export async function atualizarTarefa(request, reply) {
  console.log("Controller: atualizarTarefa chamado")

  const id = Number(request.params.id)
  const dadosAtualizados = request.body

  const tarefaAtualizada = await atualizar(id, dadosAtualizados)

  if (!tarefaAtualizada) {
    return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  return reply.send(tarefaAtualizada)
}

// Processa requisições da rota `PATCH /tarefas/:id/concluir`
export async function concluirTarefa(request, reply) {
  console.log("Controller: concluirTarefa chamado")

  const id = Number(request.params.id)
  const tarefa = await alternarConcluido(id)

  if (!tarefa) {
    return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  return reply.send(tarefa)
}

// Processa requisições da rota `DELETE /tarefas/:id`
export async function removerTarefa(request, reply) {
  console.log("Controller: removerTarefa chamado")

  const id = Number(request.params.id)
  const removido = await remover(id)

  if (!removido) {
    return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
  }

  return reply.status(204).send()
}

// tarefa - Processa requisições da rota `GET /tarefas/pendentes`
export async function listarPendentes(request, reply) {
  console.log("Controller: listarPendentes chamado")

  const pendentes = await listarPendentesModel()
  return reply.send(pendentes)
}
