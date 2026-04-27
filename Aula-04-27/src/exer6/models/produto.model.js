export default class ProdutoModel {
  #produtos;
  #proximoId;

  constructor() {
    this.#produtos = [
      { id: 1, nome: "Mouse", preco: 100 },
      { id: 2, nome: "Monitor", preco: 900 },
      { id: 3, nome: "Teclado básico", preco: 120 }
    ];

    this.#proximoId = 4;
  }

  // CRUD
  findAll() {
    return this.#produtos;
  }

  findById(id) {
    return this.#produtos.find(p => p.id === id);
  }

  create(dados) {
    const novoProduto = {
      id: this.#proximoId,
      nome: dados.nome,
      preco: dados.preco
    };

    this.#produtos.push(novoProduto);
    this.#proximoId++;

    return novoProduto;
  }

  delete(id) {
    const index = this.#produtos.findIndex(p => p.id === id);

    if (index === -1) return false;

    this.#produtos.splice(index, 1);
    return true;
  }


  // VALIDAÇÃO (exercício novo)
  static validar(dados) {
    const erros = [];

    // valida se existe body válido
    if (!dados || typeof dados !== "object") {
      return {
        valido: false,
        erros: ["Dados inválidos."]
      };
    }

    // valida nome
    if (!dados.nome || typeof dados.nome !== "string" || dados.nome.trim() === "") {
      erros.push("O campo 'nome' é obrigatório e não pode ser vazio.");
    }

    // valida preço
    if (dados.preco === undefined || dados.preco === null) {
      erros.push("O campo 'preco' é obrigatório.");
    } else if (typeof dados.preco !== "number" || dados.preco <= 0) {
      erros.push("O campo 'preco' deve ser um número maior que 0.");
    }

    return {
      valido: erros.length === 0,
      erros
    };
  }
}