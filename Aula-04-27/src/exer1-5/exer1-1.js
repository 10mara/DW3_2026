class ContaBancaria {
  constructor(titular, saldo) {
    this.titular = titular;
    this.saldo = saldo;
  }

  depositar(valor) {
    this.saldo += valor;
  }

  sacar(valor) {
    if (valor > this.saldo) {
      console.log("Saldo insuficiente.");
    } else {
      this.saldo -= valor;
    }
  }

  exibirSaldo() {
    console.log(`Titular: ${this.titular} | Saldo: R$ ${this.saldo.toFixed(2)}`);
  }
}

// Criando duas contas
const conta1 = new ContaBancaria("Ana", 100);
const conta2 = new ContaBancaria("Carlos", 50);

// Operações na conta1
conta1.depositar(50);
conta1.sacar(0);

// Operações na conta2
conta2.depositar(30);
conta2.sacar(0);

// Exibindo saldos
conta1.exibirSaldo();
conta2.exibirSaldo();