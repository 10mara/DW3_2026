// @file: src/features/tarefas/tarefa.service.js

import { AppError } from "../../errors/AppError.js";

export class TarefaService {
  constructor(repository) {
    this.repository = repository;
  }

  async listarTarefas({ busca, status } = {}) {
  let concluido

  if (status === "concluida") {
    concluido = true
  }

  if (status === "pendente") {
    concluido = false
  }

  return this.repository.listarTodos({ busca, concluido })
}
  // NOVO: Listar pendentes
  async listarPendentes() {
    return this.repository.listarPendentes();
  }

  async buscarPorId(id) {
    const tarefa = await this.repository.buscarPorId(id);
    if (!tarefa) {
      throw new AppError("Tarefa não encontrada", 404);
    }
    return tarefa;
  }

  async criarTarefa(dados) {
    if (!dados.descricao || dados.descricao.trim() === "") {
      throw new AppError("O título é obrigatório", 400);
    }

    const tarefas = await this.repository.listarTodos();
    const descricaoJaExiste = tarefas.some(
      (t) => t.descricao.toLowerCase() === dados.descricao.toLowerCase().trim(),
    );

    if (descricaoJaExiste) {
      throw new AppError("Já existe uma tarefa com esse título", 400);
    }

    return this.repository.salvar({ ...dados, status: "pendente" });
  }

  async atualizarTarefa(id, dados) {
    const tarefa = await this.buscarPorId(id);

    if (tarefa.status === "concluida") {
      throw new AppError(
        "Não é possível atualizar uma tarefa já concluída",
        400,
      );
    }

    return this.repository.atualizar(id, dados);
  }

  async concluirTarefa(id) {
    const tarefa = await this.buscarPorId(id);

    const novoStatus = tarefa.status === "concluida" ? "pendente" : "concluida";
    return this.repository.atualizar(id, { status: novoStatus });
  }

  async removerTarefa(id) {
    const tarefa = await this.buscarPorId(id);

    if (tarefa.status === "concluida") {
      throw new AppError("Não é possível remover uma tarefa já concluída", 400);
    }

    return this.repository.remover(id);
  }
  async obterResumo() {
  return this.repository.obterResumo()
}
}
