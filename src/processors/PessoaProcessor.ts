import { MessageProcessor } from '../interfaces/MessageProcessor';
import Pessoa from '../models/Pessoa';

export class PessoaProcessor implements MessageProcessor {
  private pessoas: Pessoa[];

  constructor(pessoas: Pessoa[]) {
    this.pessoas = pessoas;
  }

  process(operation: string, fields: string[]): string {
    switch (operation.toUpperCase()) {
      case 'INSERT':
        return this.insert(fields);
      case 'UPDATE':
        return this.update(fields);
      case 'DELETE':
        return this.delete(fields);
      case 'GET':
        return this.get(fields);
      case 'LIST':
        return this.list();
      default:
        return 'Operação desconhecida';
    }
  }

  private insert(fields: string[]): string {
    const [cpf, nome, endereco] = fields;
    const pessoa = new Pessoa(cpf, nome, endereco);
    this.pessoas.push(pessoa);
    return 'Pessoa inserida com sucesso';
  }

  private update(fields: string[]): string {
    const [cpf, nome, endereco] = fields;
    const pessoa = this.pessoas.find((p) => p.getCpf() === cpf);
    if (!pessoa) return 'Pessoa não encontrada';

    pessoa.setNome(nome);
    pessoa.setEndereco(endereco);
    return 'Pessoa atualizada com sucesso';
  }

  private delete(fields: string[]): string {
    const [cpf] = fields;
    const index = this.pessoas.findIndex((p) => p.getCpf() === cpf);
    if (index === -1) return 'Pessoa não encontrada';

    this.pessoas.splice(index, 1);
    return 'Pessoa removida com sucesso';
  }

  private get(fields: string[]): string {
    const [cpf] = fields;
    const pessoa = this.pessoas.find((p) => p.getCpf() === cpf);
    if (!pessoa) return 'Pessoa não encontrada';
    return pessoa.toString();
  }

  private list(): string {
    if (this.pessoas.length === 0) return '0';

    return (
      `${this.pessoas.length}\n` +
      this.pessoas.map((p) => p.toString()).join('\n')
    );
  }

  public getPessoas(): Pessoa[] {
    return this.pessoas;
  }
}
