import puppeteer from 'puppeteer';

export class PuppeteerUtil {
  /**
   * Convert a HTML string to PDF
   *
   * Root dir is assets
   * @param {string} html
   * @returns {Promise<Buffer>} PDF
   */
  static async htmlToPDF(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '40px',
        left: '20px',
        right: '20px',
      },
    });

    await browser.close();

    return pdf;
  }
}
