export class NumberUtil {
  /**
   * Normalize number
   *
   * Example: 0,74 to 0.74, 1.450,10 to 1450.10
   */
  static toNumberNormalize(text: string): number {
    if (!text || text === '') return 0.0;
    const str = text.replace(/\r?\n|\r/g, '').replace('R$', '');
    const value = parseFloat(
      str.replace(/\./g, '').replace(',', '.').replace(' ', ''),
    );

    if (isNaN(value)) return 0.0;
    return value;
  }
}
