class FilaAtendimento {
  constructor() {
    this._fila = [];
    this.contador = 1;
  }

  entrar(nome) {
    const senhaAtual = this.contador;
    this._fila.push({ senha: senhaAtual, nome });
    console.log(`Senha ${senhaAtual} gerada para ${nome}.`);
    this.contador++;
  }

  chamarProximo() {
    if (this._fila.length === 0) {
      console.log("Fila vazia.");
      return;
    }

    const proximo = this._fila.shift();
    console.log(`Chamando senha ${proximo.senha} — ${proximo.nome}`);
    return proximo;
  }

  tamanho() {
    return this._fila.length;
  }
}

// Instanciando fila
const fila = new FilaAtendimento();

// Adicionando pessoas
fila.entrar("Ana");
fila.entrar("Bruno");
fila.entrar("Carla");

// Chamando próximos
fila.chamarProximo();
fila.chamarProximo();

// Exibindo tamanho restante
console.log(`Pessoas na fila: ${fila.tamanho()}`);