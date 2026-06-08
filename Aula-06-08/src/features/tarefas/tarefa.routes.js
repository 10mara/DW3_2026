// @file: src/features/tarefas/tarefa.routes.js

import { TarefaRepository } from './tarefa.repository.js'
import { TarefaService } from './tarefa.service.js'
import { TarefaController } from './tarefa.controller.js'

export default async function tarefaRoutes(server) {

  // Injecao de Dependencia
  const repository = new TarefaRepository()
  const service = new TarefaService(repository)
  const controller = new TarefaController(service)

  // Registro das Rotas
  server.get('/tarefas', async (request, reply) => controller.listar(request, reply))
  server.post('/tarefas', async (request, reply) => controller.criar(request, reply))
  
  // Rota especifica deve vir ANTES de rotas com parametros
  server.get('/tarefas/pendentes', async (request, reply) => controller.listarPendentes(request, reply))
  
  server.get('/tarefas/:id', async (request, reply) => controller.buscar(request, reply))
  server.patch('/tarefas/:id', async (request, reply) => controller.atualizar(request, reply))
  server.patch('/tarefas/:id/concluir', async (request, reply) => controller.concluir(request, reply))
  server.delete('/tarefas/:id', async (request, reply) => controller.remover(request, reply))
}