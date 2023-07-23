import * as bcrypt from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Argon2Util } from './argon2.util';
/**
 * Encripts and compare text with bcrypt
 *
 * @deprecated
 *
 * See {@link Argon2Util} Check Argon2Util
 */
export class BcryptUtil {
  /**
   * Generates a hash from a given string
   */
  static hash(data: string): Promise<string> {
    if (!data) throw new Error('hash: data is required');
    return bcrypt.hash(data, 10);
  }
  /**
   * Compares a given string with a hash
   */
  static compare(data: string, hash: string): Promise<boolean> {
    if (!data || !hash) throw new Error('compare: data and hash are required');
    return bcrypt.compare(data, hash);
  }
}
