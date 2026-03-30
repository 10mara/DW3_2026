import Fastify from 'fastify'
import cors from '@fastify/cors'

// Criamos uma instância do servidor Fastify
const server = Fastify()

// Registramos o plugin de CORS para permitir que qualquer origem acesse nossa API
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
})

// Definimos a porta onde o servidor irá rodar
const PORT = 3000

// Nosso "banco de dados" em memória, onde as tarefas serão armazenadas. Cada tarefa é um objeto com um ID, descrição e status de conclusão.
const tarefas = [
    {id: 1, descricao: "Fazer compras", concluido: false}, 
    {id: 2, descricao: "Lavar o carro", concluido: false},
    {id: 3, descricao: "Estudar Fastify", concluido: true}
]

// -------------------- ROTAS --------------------

// POST /tarefas - Criar uma nova tarefa (CREATE)
server.post('/tarefas', async (request, reply) => {
    const { descricao, concluido } = request.body

    // ❌ validação
    if (!descricao || descricao.trim() === '') {
        return reply.status(400).send({
            status: 'error',
            message: 'A descrição é obrigatória'
        })
    }

    const novoId = tarefas.length > 0
        ? tarefas[tarefas.length - 1].id + 1
        : 1

    const novaTarefa = {
        id: novoId,
        descricao,
        concluido: concluido ?? false
    }

    tarefas.push(novaTarefa)

    return reply.status(201).send(novaTarefa)
})

// GET /tarefas/resumo - Estatísticas
server.get('/tarefas/resumo', async (request, reply) => {
    const total = tarefas.length
    const concluidas = tarefas.filter(t => t.concluido).length
    const pendentes = total - concluidas

    return reply.send({ total, concluidas, pendentes })
})

// PATCH /tarefas/:id/concluir - Toggle concluir tarefa
server.patch('/tarefas/:id/concluir', async (request, reply) => {
    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return reply.status(404).send({
            status: 'error',
            message: 'Tarefa não encontrada'
        })
    }

    // 🔄 inverter valor
    tarefas[index].concluido = !tarefas[index].concluido

    return reply.send(tarefas[index])
})

// GET /tarefas/:id - Buscar tarefa por ID
server.get('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const tarefa = tarefas.find(t => t.id === id)

    if (!tarefa) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    return reply.send(tarefa)
})

// GET /tarefas - Listagem com filtros
server.get('/tarefas', async (request, reply) => {
    const { busca, concluido } = request.query
    let resultado = tarefas

    // 🔍 filtro por descrição
    if (busca) {
        resultado = resultado.filter(t =>
            t.descricao.toLowerCase().includes(busca.toLowerCase())
        )
    }

    // ✅ filtro por status
    if (concluido !== undefined) {
        resultado = resultado.filter(t =>
            String(t.concluido) === concluido
        )
    }

    return reply.send(resultado)
})

// PATCH /tarefas/:id - Atualizar tarefa
server.patch('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    const tarefaAtualizada = request.body
    tarefas[index] = { ...tarefas[index], ...tarefaAtualizada, id }

    return reply.send(tarefas[index])
})

// DELETE /tarefas/:id - Remover tarefa
server.delete('/tarefas/:id', async (request, reply) => {
    const id = Number(request.params.id)
    const index = tarefas.findIndex(t => t.id === id)

    if (index === -1) {
        return reply.status(404).send({ status: 'error', message: 'Tarefa não encontrada' })
    }

    tarefas.splice(index, 1)
    return reply.status(204).send()
})

// -------------------- HANDLER NOT FOUND --------------------
server.setNotFoundHandler((request, reply) => {
    return reply.code(404).send({
        status: 'error',
        message: 'O recurso solicitado não existe nesta API.',
    })
})

// -------------------- EXEMPLOS --------------------
// server.get('/exemplo1', async (request, reply) => {
//     const dados = { mensagem: "Olá!" }
//     return dados
// })

// server.post('/exemplo2', async (request, reply) => {
//     const dados = { mensagem: "Criado com sucesso!" }
//     reply.status(201).send(dados)
// })

// server.get('/exemplo3/:id', async (request, reply) => {
//     const temErro = true
//     if (temErro) {
//         return reply.status(404).send({ erro: "Página não encontrada!" })
//     }
//     reply.send({ mensagem: "Sucesso!" })
// })

// -------------------- INICIAR SERVIDOR --------------------
const start = async () => {
    try {
        await server.listen({ port: PORT })
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    } catch (erro) {
        console.error(erro)
        process.exit(1)
    }
}

start()