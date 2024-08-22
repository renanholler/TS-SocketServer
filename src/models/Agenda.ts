import Pessoa from './Pessoa';

export default class Agenda {
  constructor(
    private descricao: string,
    private compromissos: string[],
    private ativa: boolean,
    private pessoa: Pessoa,
  ) {}

  public getDescricao(): string {
    return this.descricao;
  }

  public getCompromissos(): string[] {
    return this.compromissos;
  }

  public setCompromissos(compromissos: string[]): void {
    this.compromissos = compromissos;
  }

  public setAtiva(ativa: boolean): void {
    this.ativa = ativa;
  }

  public isAtiva(): boolean {
    return this.ativa;
  }

  public getPessoa(): Pessoa {
    return this.pessoa;
  }

  public toString(): string {
    return `${this.descricao};${this.compromissos.join(',')};${this.ativa};${this.pessoa.toString()}`;
  }
}
