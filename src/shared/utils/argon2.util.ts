import * as argon2 from 'argon2';
export class Argon2Util {
  /**
   * Generates a hash from a given string
   */
  static hashData(data: string): Promise<string> {
    return argon2.hash(data);
  }
  /**
   * Compares a given string with a hash
   */
  static async verify(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
