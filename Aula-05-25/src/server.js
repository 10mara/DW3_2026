// @file: src/server.js

import Fastify from 'fastify'
import tarefaRoutes from './features/tarefas/tarefa.routes.js'
import { AppError } from './errors/AppError.js'

const server = Fastify({ logger: true })

// Tratamento de Erros Global
server.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message
    })
  }

  console.error('ERRO INTERNO:', error)

  return reply.status(500).send({
    status: 'error',
    message: 'Internal Server Error'
  })
})

// Registro de Rotas
server.register(tarefaRoutes)

const start = async () => {
  await server.listen({ port: 3000 })
}

start()