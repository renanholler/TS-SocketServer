import { MessageProcessor } from '../interfaces/MessageProcessor';
import Funcionario from '../models/Funcionario';
import Pessoa from '../models/Pessoa';

export class FuncionarioProcessor implements MessageProcessor {
  private funcionarios: Funcionario[] = [];
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
    const [cpf, cargo, salario] = fields;

    // Verificar se a Pessoa existe
    const pessoa = this.pessoas.find((p) => p.getCpf() === cpf);
    if (!pessoa) return 'Pessoa não encontrada';

    const funcionario = new Funcionario(
      cpf,
      pessoa.getNome(),
      pessoa.getEndereco(),
      cargo,
      parseFloat(salario),
    );
    this.funcionarios.push(funcionario);
    return 'Funcionário inserido com sucesso';
  }

  private update(fields: string[]): string {
    const [cpf, cargo, salario] = fields;

    const funcionario = this.funcionarios.find((f) => f.getCpf() === cpf);
    if (!funcionario) return 'Funcionário não encontrado';

    funcionario.setCargo(cargo);
    funcionario.setSalario(parseFloat(salario));
    return 'Funcionário atualizado com sucesso';
  }

  private delete(fields: string[]): string {
    const [cpf] = fields;

    const index = this.funcionarios.findIndex((f) => f.getCpf() === cpf);
    if (index === -1) return 'Funcionário não encontrado';

    this.funcionarios.splice(index, 1);
    return 'Funcionário removido com sucesso';
  }

  private get(fields: string[]): string {
    const [cpf] = fields;

    const funcionario = this.funcionarios.find((f) => f.getCpf() === cpf);
    if (!funcionario) return 'Funcionário não encontrado';

    return funcionario.toString();
  }

  private list(): string {
    if (this.funcionarios.length === 0) return '0';

    return (
      `${this.funcionarios.length}\n` +
      this.funcionarios.map((f) => f.toString()).join('\n')
    );
  }
}
