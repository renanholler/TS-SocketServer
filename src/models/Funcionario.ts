import Pessoa from './Pessoa';

export default class Funcionario extends Pessoa {
  constructor(
    cpf: string,
    nome: string,
    endereco: string,
    private cargo: string,
    private salario: number,
  ) {
    super(cpf, nome, endereco);
  }

  public getCargo(): string {
    return this.cargo;
  }

  public getSalario(): number {
    return this.salario;
  }

  public setCargo(cargo: string): void {
    this.cargo = cargo;
  }

  public setSalario(salario: number): void {
    this.salario = salario;
  }

  public toString(): string {
    return `${super.toString()};${this.cargo};${this.salario}`;
  }
}
