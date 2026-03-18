import http from "http"
http.createServer((req,res)=>{
    console.log("chegou uma requisição")
    res.end("primeira aula dw3")
}).listen(3000)
console.log("Servidor rodando")