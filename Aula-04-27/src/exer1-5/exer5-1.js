
/*
1. O erro ocorre porque a função dentro do setInterval é uma função tradicional (function).
Funções tradicionais criam seu próprio "this", que não aponta para a instância da classe.
Assim, "this.nome" e "this.segundos" ficam indefinidos ou incorretos.

2. Substituímos a função tradicional por uma arrow function:
  () => { ... }

Arrow functions não criam seu próprio "this".
Elas herdam o "this" do contexto onde foram definidas (a classe Timer).

3. Com function: o this muda dependendo de como a função é chamada.
Com arrow function: o this é fixo e herda o contexto externo.
Isso garante que "this" continue sendo a instância do Timer dentro do setInterval.
*/

class Timer {
  constructor(nome) {
    this.nome = nome;
    this.segundos = 0;
  }

  iniciar() {
    setInterval(() => {
      this.segundos++;
      console.log(`${this.nome}: ${this.segundos}s`);
    }, 1000);
  }
}

const t = new Timer("Cronômetro");
t.iniciar();
