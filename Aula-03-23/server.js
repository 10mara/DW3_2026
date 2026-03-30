import Fastify from "fastify";

const server= Fastify()
const tarefas=[
    {id:1,descricao: "fazer bolo"},
    {id:2,descricao: "estudar"},
    {id:3,descricao: "ir na academia"}]

server.get('/tarefas',async(request,reply)=>{
    reply.send(tarefas)
})

server.post('/tarefas',async(request, reply)=>{
    const tarefa= request.body
    tarefas.push(tarefa)
    reply.send({status:"sucesso",message:"ok"})
})

try{
    await server.listen({port:3000})
    console.log("sevidor rodando na porta 3000")
} catch(erro){
    console.log("erro")
}