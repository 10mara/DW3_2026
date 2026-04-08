const fastify = require("fastify")({ logger: true });
const tarefaRoutes = require("./tarefa.routes");

// Registrar as rotas de tarefas
fastify.register(tarefaRoutes);

// Rota raiz
fastify.get("/", async (request, reply) => {
  return { mensagem: "API de Tarefas - MVC" };
});

// Iniciar o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("Servidor rodando em http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();