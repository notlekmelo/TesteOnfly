import * as ejs from 'ejs';
import * as path from 'path';

export class EjsUtil {
  /**
   * Render html file
   *
   * Root dir is assets
   * @param {string} fileName
   * @param {any} data
   * @returns {Promise<String>} HTML
   */
  static async renderFile(fileName: string, data: any): Promise<string> {
    const dir = path.join(__dirname, '../../../assets/impressao');
    return new Promise((resolve) => {
      ejs.renderFile(
        path.join(dir, fileName),
        data,
        (err: Error, html: string) => {
          if (err) {
            console.error('renderHtml', err.message);
            throw err;
          }
          resolve(html);
        },
      );
    });
  }
}
