class Estoque {
  constructor() {
    this.produtos = [];
  }

  cadastrar(nome, quantidade) {
    const existe = this.produtos.find(p => p.nome === nome);

    if (existe) {
      console.log("Produto já cadastrado.");
      return;
    }

    this.produtos.push({ nome, quantidade });
  }

  entrada(nome, quantidade) {
    const produto = this.produtos.find(p => p.nome === nome);

    if (!produto) {
      console.log("Produto não encontrado.");
      return;
    }

    produto.quantidade += quantidade;
  }

  saida(nome, quantidade) {
    const produto = this.produtos.find(p => p.nome === nome);

    if (!produto) {
      console.log("Produto não encontrado.");
      return;
    }

    if (produto.quantidade - quantidade < 0) {
      console.log("Quantidade insuficiente.");
      return;
    }

    produto.quantidade -= quantidade;
  }

  exibir() {
    this.produtos.forEach(p => {
      console.log(`${p.nome}: ${p.quantidade} unidades`);
    });
  }
}

// Instanciando estoque
const estoque = new Estoque();

// Cadastrando produtos
estoque.cadastrar("Caneta", 20);
estoque.cadastrar("Caderno", 10);

// Operações
estoque.entrada("Caneta", 10);   // 20 + 10 = 30
estoque.saida("Caderno", 2);     // 10 - 2 = 8

// Exibindo resultado
estoque.exibir();