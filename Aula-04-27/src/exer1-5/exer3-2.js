class Documento {
  constructor(titulo) {
    this.titulo = titulo;
    this.conteudo = "";
    this._historico = [];
  }

  editar(novoConteudo) {
    // Salva o estado atual antes de alterar
    this._historico.push(this.conteudo);
    this.conteudo = novoConteudo;
  }

  desfazer() {
    if (this._historico.length === 0) {
      console.log("Nada para desfazer.");
      return;
    }

    this.conteudo = this._historico.pop();
  }

  exibir() {
    console.log(`[${this.titulo}] Conteúdo atual: ${this.conteudo}`);
  }
}

// Instanciando documento
const doc = new Documento("Relatório");

// Fazendo edições
doc.editar("Primeira versão do texto.");
doc.editar("Segunda versão do texto.");
doc.editar("Terceira versão do texto.");

// Desfazendo duas vezes
doc.desfazer();
doc.desfazer();

// Exibindo resultado final
doc.exibir();