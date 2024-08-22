export default class Pessoa {
  constructor(
    private cpf: string,
    private nome: string,
    private endereco: string,
  ) {}

  public getCpf(): string {
    return this.cpf;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getEndereco(): string {
    return this.endereco;
  }

  public setEndereco(endereco: string): void {
    this.endereco = endereco;
  }

  public toString(): string {
    return `${this.cpf};${this.nome};${this.endereco}`;
  }
}
