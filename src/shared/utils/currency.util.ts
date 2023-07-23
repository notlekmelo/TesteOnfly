export class CurrencyUtil {
  static toBRL(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  static sumBRL(values: number[]): string {
    return this.toBRL(values.reduce((a, b) => a + b, 0));
  }
}
