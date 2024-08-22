// server.ts
import * as net from 'net';
import { MessageProcessor } from './interfaces/MessageProcessor';
import Pessoa from './models/Pessoa';
import { AgendaProcessor } from './processors/AgendaProcessor';
import { ClienteProcessor } from './processors/ClienteProcessor';
import { FuncionarioProcessor } from './processors/FuncionarioProcessor';
import { PessoaProcessor } from './processors/PessoaProcessor';

export class Server {
  private pessoas: Pessoa[] = []; // Lista centralizada de Pessoas
  private strategies: Record<string, MessageProcessor> = {
    PESSOA: new PessoaProcessor(this.pessoas),
    CLIENTE: new ClienteProcessor(this.pessoas),
    FUNCIONARIO: new FuncionarioProcessor(this.pessoas),
    AGENDA: new AgendaProcessor(this.pessoas),
  };

  public start(port: number) {
    const server = net.createServer((socket: net.Socket) => {
      console.log('Novo cliente conectado');

      socket.on('data', (data) => {
        const message = data.toString();
        console.log(`Recebido: ${message}`);

        const [operationContext, ...fields] = message.split(';');
        const [operation, entity] = operationContext.split('_');

        const processor = entity && this.strategies[entity.toUpperCase()];

        let response = 'Entidade ou operação não suportada';
        if (processor) {
          response = processor.process(operation, fields);
        }

        socket.write(response, () => {
          socket.end();
        });
      });

      socket.on('end', () => {
        console.log('Cliente desconectado');
      });

      socket.on('error', (err) => {
        console.log(`Erro: ${err}`);
      });
    });

    server.listen(port, '0.0.0.0', () => {
      console.log(`Servidor ouvindo na porta ${port}`);
    });
  }
}
