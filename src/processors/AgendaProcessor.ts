import { MessageProcessor } from '../interfaces/MessageProcessor';
import Agenda from '../models/Agenda';
import Pessoa from '../models/Pessoa';

export class AgendaProcessor implements MessageProcessor {
  private agendas: Agenda[] = [];
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
    const [cpf, descricao, compromissosString, ativaString] = fields;

    // Verificar se a Pessoa existe
    const pessoa = this.pessoas.find((p) => p.getCpf() === cpf);
    if (!pessoa) return 'Pessoa não encontrada';

    const compromissos = compromissosString.split(',');
    const ativa = ativaString === 'true';
    const agenda = new Agenda(descricao, compromissos, ativa, pessoa);
    this.agendas.push(agenda);
    return 'Agenda inserida com sucesso';
  }

  private update(fields: string[]): string {
    const [descricao, compromissosString, ativaString] = fields;

    const agenda = this.agendas.find((a) => a.getDescricao() === descricao);
    if (!agenda) return 'Agenda não encontrada';

    const compromissos = compromissosString.split(',');
    agenda.setCompromissos(compromissos);
    agenda.setAtiva(ativaString === 'true');
    return 'Agenda atualizada com sucesso';
  }

  private delete(fields: string[]): string {
    const [descricao] = fields;

    const index = this.agendas.findIndex((a) => a.getDescricao() === descricao);
    if (index === -1) return 'Agenda não encontrada';

    this.agendas.splice(index, 1);
    return 'Agenda removida com sucesso';
  }

  private get(fields: string[]): string {
    const [descricao] = fields;

    const agenda = this.agendas.find((a) => a.getDescricao() === descricao);
    if (!agenda) return 'Agenda não encontrada';

    return agenda.toString();
  }

  private list(): string {
    if (this.agendas.length === 0) return '0';

    return (
      `${this.agendas.length}\n` +
      this.agendas.map((a) => a.toString()).join('\n')
    );
  }
}
