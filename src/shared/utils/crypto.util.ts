import * as crypto from 'crypto';
import * as cryptojs from 'crypto-js';

export class CryptoUtil {
  static hashSha256(text: string) {
    const hash = crypto.createHash('sha256');
    return hash.update(text).digest('hex');
  }

  static uuid() {
    return crypto.randomUUID();
  }

  static encrypt(text: string, key: string) {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes256', key, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  static decrypt(text: string, key: string) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');

    const decipher = crypto.createDecipheriv('aes256', key, iv);

    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    return decrypted.toString();
  }

  static secret(n: number) {
    return crypto.randomBytes(n).toString('hex');
  }

  static decryptDatabase(text: string) {
    const { DB_SECRET_KEY } = process.env;

    return cryptojs.AES.decrypt(text, DB_SECRET_KEY).toString(
      cryptojs.enc.Utf8,
    );
  }
}
