# Questões de reflexão

## 1. O que é um Fat Model e por que ele é um problema?

Um **Fat Model** é um model que concentra responsabilidades demais no mesmo arquivo. Ele mistura:

- regras de negócio
- cálculos
- validações
- acesso aos dados

Isso é um problema porque aumenta o acoplamento e dificulta manutenção. Qualquer mudança no armazenamento dos dados pode acabar afetando regras de negócio, aumentando o risco de quebrar funcionalidades da aplicação.

Além disso, o código fica mais difícil de testar, reutilizar e evoluir conforme o sistema cresce.

---

## 2. Por que o `TarefaService` recebe o `TarefaRepository` via constructor?

O `TarefaService` recebe o repository via constructor para aplicar **injeção de dependência**.

Isso evita que o service fique acoplado a uma implementação específica de repository.

Exemplo ruim:

```js
this.repository = new TarefaRepository()
```

Nesse caso, o service decide sozinho qual repository usar.

Com injeção de dependência:

```js
constructor(repository) {
  this.repository = repository
}
```

o service funciona com qualquer implementação que tenha os métodos necessários (`buscarTodos`, `salvar`, etc.).

A principal vantagem é facilitar troca de implementação e manutenção da aplicação.

---

## 3. Qual é o papel do `server.js` como Composition Root?

O `server.js` é o lugar onde todas as dependências da aplicação são criadas e conectadas.

Ele:

- cria as instâncias com `new`
- monta a cadeia de dependências
- injeta repository no service
- injeta service no controller
- registra as rotas

Ele centraliza a composição da aplicação em um único lugar.

---

## 4. O que precisaria mudar para usar PostgreSQL?

Com a arquitetura atual, principalmente o `TarefaRepository`.

Seria necessário:

- criar um novo repository com consultas SQL
- substituir as operações no array por queries no banco
- configurar conexão com PostgreSQL

O `TarefaService`, o `Controller` e as `Routes` praticamente não precisariam mudar, porque eles não sabem como os dados são armazenados.

No `server.js`, bastaria trocar:

```js
const repository = new TarefaRepository()
```

por uma implementação conectada ao PostgreSQL.

Isso mostra a vantagem do desacoplamento entre regras de negócio e acesso aos dados.

---

## 5. Por que `alternarConcluido` está no Service e não no Repository?

Porque `alternarConcluido` representa uma **regra de negócio**.

O repository deve apenas:

- buscar dados
- salvar dados
- atualizar dados
- remover dados

Já a lógica de:

1. buscar a tarefa
2. verificar se ela existe
3. inverter o valor de `concluido`
4. atualizar a tarefa

é uma decisão de negócio da aplicação.

Por isso ela pertence ao `Service`, que é a camada responsável por coordenar regras e comportamentos do sistema.