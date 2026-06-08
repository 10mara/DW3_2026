## 3
Esse resumo foi feito direto no PostgreSQL. Em vez de buscar todas as tarefas e contar no JavaScript, o banco já devolve os totais prontos. Essa abordagem é melhor quando existem muitos dados, porque evita trazer tudo para a aplicação só para contar.
## 4
O SQL de laboratório não deveria continuar no server.js porque esse arquivo deve cuidar apenas da inicialização da aplicação, configuração global e registro das rotas. Quando colocamos SQL nele, misturamos responsabilidades e deixamos o projeto mais difícil de organizar e manter.

O Repository é o lugar correto para o acesso a dados porque essa camada tem justamente a função de buscar, salvar, atualizar e remover informações. Como agora os dados estão no PostgreSQL, é dentro do Repository que as consultas SQL devem ficar.

Na arquitetura, o que mudou foi a forma de persistência: antes as tarefas ficavam em um array na memória, agora ficam salvas no PostgreSQL. O que não mudou foi o papel das camadas: o Controller continua lidando com HTTP, o Service continua cuidando das regras de negócio e o Repository continua sendo responsável pelos dados.