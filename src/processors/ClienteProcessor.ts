import { MessageProcessor } from '../interfaces/MessageProcessor';
import Cliente from '../models/Cliente';
import Pessoa from '../models/Pessoa';

export class ClienteProcessor implements MessageProcessor {
  private clientes: Cliente[] = [];
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
    const [cpf, codigoCliente, nivel] = fields;

    // Verificar se a Pessoa existe
    const pessoa = this.pessoas.find((p) => p.getCpf() === cpf);
    if (!pessoa) return 'Pessoa não encontrada';

    const cliente = new Cliente(
      cpf,
      pessoa.getNome(),
      pessoa.getEndereco(),
      parseInt(codigoCliente),
      parseInt(nivel),
    );
    this.clientes.push(cliente);
    return 'Cliente inserido com sucesso';
  }

  private update(fields: string[]): string {
    const [codigoCliente, nivel] = fields;

    const cliente = this.clientes.find(
      (c) => c.getCodigoCliente() === parseInt(codigoCliente),
    );
    if (!cliente) return 'Cliente não encontrado';

    cliente.setNivel(parseInt(nivel));
    return 'Cliente atualizado com sucesso';
  }

  private delete(fields: string[]): string {
    const [codigoCliente] = fields;

    const index = this.clientes.findIndex(
      (c) => c.getCodigoCliente() === parseInt(codigoCliente),
    );
    if (index === -1) return 'Cliente não encontrado';

    this.clientes.splice(index, 1);
    return 'Cliente removido com sucesso';
  }

  private get(fields: string[]): string {
    const [codigoCliente] = fields;

    const cliente = this.clientes.find(
      (c) => c.getCodigoCliente() === parseInt(codigoCliente),
    );
    if (!cliente) return 'Cliente não encontrado';

    return cliente.toString();
  }

  private list(): string {
    if (this.clientes.length === 0) return '0';

    return (
      `${this.clientes.length}\n` +
      this.clientes.map((c) => c.toString()).join('\n')
    );
  }
}
