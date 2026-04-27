class Carrinho {
  constructor() {
    this.itens = [];
  }

  adicionar(nome, preco, quantidade) {
    this.itens.push({ nome, preco, quantidade });
  }

  remover(nome) {
    const index = this.itens.findIndex(item => item.nome === nome);
    
    if (index === -1) {
      console.log("Item não encontrado.");
    } else {
      this.itens.splice(index, 1);
    }
  }

  total() {
    return this.itens.reduce((soma, item) => {
      return soma + item.preco * item.quantidade;
    }, 0);
  }

  exibir() {
    this.itens.forEach(item => {
      console.log(`${item.quantidade}x ${item.nome} — R$ ${item.preco.toFixed(2)}`);
    });

    console.log(`Total: R$ ${this.total().toFixed(2)}`);
  }
}

// Instanciando carrinho
const carrinho = new Carrinho();

// Adicionando itens
carrinho.adicionar("Arroz", 10, 2);
carrinho.adicionar("Feijão", 8, 1);
carrinho.adicionar("Sabão", 5.5, 1);

// Removendo um item
carrinho.remover("Feijão");

// Exibindo resultado
carrinho.exibir();