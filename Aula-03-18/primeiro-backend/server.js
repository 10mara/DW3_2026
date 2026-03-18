// Importa o framework Fastify.
// Fastify é uma função que retorna uma instância do servidor.
import Fastify from 'fastify'

// Cria a instância do servidor e habilita o logger integrado.
// `logger: true` faz o Fastify registrar requisições e erros no console.
const server = Fastify({
  logger: true
})

// Declara uma rota HTTP GET para o caminho raiz ('/').
// A função `handler` é assíncrona e recebe dois objetos:
// - `request`: contém dados da requisição (headers, query, params, body, etc.)
// - `reply`: objeto para controlar a resposta (ex.: reply.send(), reply.code())
// Neste exemplo retornamos diretamente um objeto; Fastify converte para JSON.
server.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Inicia o servidor na porta 3000.
// Usamos try/catch para capturar possíveis erros na inicialização.
// Observação: este arquivo usa `await` no nível superior (top-level await),
// portanto o ambiente precisa suportar ESM ("type": "module" no package.json)
// e uma versão do Node que permita top-level await.
try {
  // `listen` recebe um objeto com opções (ex.: { port, host }) e resolve quando
  // o servidor estiver escutando. Retorna a URL/porta onde o servidor ficou.
  await server.listen({ port: 3000 })
} catch (err) {
  // Se ocorrer um erro ao iniciar, registramos o erro e encerramos o processo
  // com um código diferente de zero (indica falha).
  fastify.log.error(err)
  process.exit(1)
}