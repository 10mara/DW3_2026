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

// Rotas temporárias de laboratório
server.get('/laboratorio/tarefas-db', async (request, reply) => {
  const resultado = await client.query(`
    SELECT id, descricao, concluido, criada_em
    FROM tarefas
    ORDER BY id
  `)

  return reply.send(resultado.rows)
})

// server.post('/laboratorio/tarefas-db', async (request, reply) => {
//   const { descricao } = request.body

//   if (!descricao || descricao.trim() === '') {
//     return reply.status(400).send({
//       status: 'error',
//       message: 'A descrição da tarefa é obrigatória'
//     })
//   }

//   const resultado = await client.query(
//     `
//       INSERT INTO tarefas (descricao)
//       VALUES ($1)
//       RETURNING id, descricao, concluido, criada_em
//     `,
//     [descricao.trim()]
//   )

//   return reply.status(201).send(resultado.rows[0])
// })

server.post('/laboratorio/tarefas-db', async (request, reply) => {
  const { descricao, concluido } = request.body

  if (!descricao || descricao.trim() === '') {
    return reply.status(400).send({
      status: 'error',
      message: 'A descrição da tarefa é obrigatória'
    })
  }

  const resultado = await client.query(
    `
      INSERT INTO tarefas (descricao, concluido)
      VALUES ($1, $2)
      RETURNING id, descricao, concluido, criada_em
    `,
    [descricao.trim(), concluido]
  )

  return reply.status(201).send(resultado.rows[0])
})

server.get('/laboratorio/tarefas-db/concluidas', async (request, reply) => {
  const resultado = await client.query(`
    SELECT id, descricao, concluido, criada_em
    FROM tarefas
    WHERE concluido = true
    ORDER BY id
  `)

  return reply.send(resultado.rows)
})

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