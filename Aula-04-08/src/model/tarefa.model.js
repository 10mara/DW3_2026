// Array que simula o banco de dados
let tarefas = [
  {
    id: 1,
    titulo: "Estudar Node.js",
    descricao: "Aprender sobre APIs REST",
    concluida: false,
    dataCriacao: new Date().toISOString(),
  },
  {
    id: 2,
    titulo: "Fazer exercicios",
    descricao: "Completar o projeto do curso",
    concluida: true,
    dataCriacao: new Date().toISOString(),
  },
];

let proximoId = 3;

// Funcao para listar tarefas com filtros opcionais
function listarTarefas(filtros = {}) {
  let resultado = [...tarefas];

  // Filtrar por status de conclusao
  if (filtros.concluida !== undefined) {
    const concluida = filtros.concluida === "true";
    resultado = resultado.filter((t) => t.concluida === concluida);
  }

  // Filtrar por termo de busca no titulo
  if (filtros.busca) {
    const termo = filtros.busca.toLowerCase();
    resultado = resultado.filter((t) =>
      t.titulo.toLowerCase().includes(termo)
    );
  }

  return resultado;
}

// Funcao para buscar tarefa por ID
function buscarPorId(id) {
  return tarefas.find((t) => t.id === id);
}

// Funcao para criar nova tarefa
function criar(dados) {
  const novaTarefa = {
    id: proximoId++,
    titulo: dados.titulo,
    descricao: dados.descricao || "",
    concluida: false,
    dataCriacao: new Date().toISOString(),
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

// Funcao para atualizar tarefa existente
function atualizar(id, dados) {
  const tarefa = buscarPorId(id);
  if (!tarefa) return null;

  if (dados.titulo !== undefined) tarefa.titulo = dados.titulo;
  if (dados.descricao !== undefined) tarefa.descricao = dados.descricao;
  if (dados.concluida !== undefined) tarefa.concluida = dados.concluida;

  return tarefa;
}

// Funcao para remover tarefa
function remover(id) {
  const indice = tarefas.findIndex((t) => t.id === id);
  if (indice === -1) return false;

  tarefas.splice(indice, 1);
  return true;
}

// Funcao para alternar status de conclusao
function alternarConclusao(id) {
  const tarefa = buscarPorId(id);
  if (!tarefa) return null;

  tarefa.concluida = !tarefa.concluida;
  return tarefa;
}

// Funcao para obter resumo das tarefas
function obterResumo() {
  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.concluida).length;
  const pendentes = total - concluidas;

  return { total, concluidas, pendentes };
}

// Exportar todas as funcoes
module.exports = {
  listarTarefas,
  buscarPorId,
  criar,
  atualizar,
  remover,
  alternarConclusao,
  obterResumo,
};