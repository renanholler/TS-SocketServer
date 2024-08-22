export interface MessageProcessor {
  process(operation: string, fields: string[]): string;
}
