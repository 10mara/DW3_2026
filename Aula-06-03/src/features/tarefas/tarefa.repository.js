// @file: src/features/tarefas/tarefa.repository.js

export class TarefaRepository {
  constructor() {
    this.tarefas = [
      { id: 1, titulo: "Fazer compras", status: "pendente" },
      { id: 2, titulo: "Lavar o carro", status: "pendente" },
      { id: 3, titulo: "Estudar Fastify", status: "concluida" }
    ]
  }

  async listarTodos() {
    return this.tarefas
  }

  async buscarPorId(id) {
    return this.tarefas.find(t => t.id === Number(id)) ?? null
  }

  async salvar(tarefa) {
    const novoId = this.tarefas.length > 0
      ? this.tarefas[this.tarefas.length - 1].id + 1
      : 1
    const novaTarefa = { id: novoId, ...tarefa }
    this.tarefas.push(novaTarefa)
    return novaTarefa
  }

  async atualizar(id, dadosAtualizados) {
    const index = this.tarefas.findIndex(t => t.id === Number(id))
    if (index === -1) return null
    this.tarefas[index] = { ...this.tarefas[index], ...dadosAtualizados }
    return this.tarefas[index]
  }

  async remover(id) {
    const index = this.tarefas.findIndex(t => t.id === Number(id))
    if (index === -1) return false
    this.tarefas.splice(index, 1)
    return true
  }

  // NOVO: Listar apenas pendentes
  async listarPendentes() {
    return this.tarefas.filter(t => t.status === 'pendente')
  }
}