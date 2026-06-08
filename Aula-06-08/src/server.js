// @file: src/server.js

import Fastify from 'fastify'
import tarefaRoutes from './features/tarefas/tarefa.routes.js'
import { AppError } from './errors/AppError.js'
import client from './database/client.js'

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

// Registro de Rotas principais
server.register(tarefaRoutes)


const start = async () => {
  try {
    await client.connect()
    console.log('Conectado ao PostgreSQL com sucesso')

    await server.listen({ port: 3000 })
    console.log('Servidor rodando em http://localhost:3000')
  } catch (error) {
    console.error('Falha ao iniciar a aplicação:', error)
    process.exit(1)
  }
}

start()