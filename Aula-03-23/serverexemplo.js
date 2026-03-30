import Fastify from "fastify";

const server= Fastify()

server.get('/',async(request,reply)=>{
    console.log("requisição recebida")
    reply.send("oi")
})

server.get('/json',async(request,reply)=>{
    console.log("requisição recebida")
    reply.send({nome:"samara"})
})
server.get('/html',async(request,reply)=>{
    console.log("requisição recebida")
    reply.type('text/html').send("<h1>Olá mundo</h1>")
})

try{
    await server.listen({port:3000})
    console.log("sevidor rodando na porta 3000")
} catch(erro){
    console.log("erro")
}