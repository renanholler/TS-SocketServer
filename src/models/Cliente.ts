import Pessoa from './Pessoa';

export default class Cliente extends Pessoa {
  constructor(
    cpf: string,
    nome: string,
    endereco: string,
    private codigoCliente: number,
    private nivel: number,
  ) {
    super(cpf, nome, endereco);
  }

  public getCodigoCliente(): number {
    return this.codigoCliente;
  }

  public getNivel(): number {
    return this.nivel;
  }

  public setNivel(nivel: number): void {
    this.nivel = nivel;
  }

  public toString(): string {
    return `${super.toString()};${this.codigoCliente};${this.nivel}`;
  }
}
