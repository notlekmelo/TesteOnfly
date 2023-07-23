import { addDays, addHours, format, parse } from 'date-fns';
export class DateUtil {
  /**
   * Convert string to date
   *
   * @param dateStr Date yyyy-MM-dd
   *
   * @returns {string}
   */
  static toDate(dateStr: string): Date {
    try {
      return parse(dateStr, 'yyyy-MM-dd', new Date());
    } catch (err) {
      return null;
    }
  }

  /**
   * Convert string to date
   *
   * @param dateStr Date yyyy-MM-dd
   *
   * @returns {string}
   */
  static toDatePtBr(dateStr: string): Date {
    const dateParse = parse(dateStr, 'dd/MM/yyyy', new Date());
    if (dateParse.isDate()) {
      return dateParse;
    }
    return null;
  }

  /**
   * Format date mask yyy-MM-dd
   *
   * @param date
   * @returns
   */
  static formatIso(date: number | Date) {
    return format(date, 'yyyy-MM-dd');
  }

  /**
   * Add days on date
   *
   * @param date Date
   * @param days days
   * @returns {Date}
   */
  static addDaysDate(date: Date, days: number): Date {
    return addDays(date, days);
  }

  /**
   * Add hours on date
   *
   * @param date Date
   * @param days days
   * @returns {Date}
   */
  static addHoursDate(date: Date, hours: number): Date {
    return addHours(date, hours);
  }

  /**
   * Subtract 3 hours from current date - GMT-3
   *
   * @returns {Date}
   */
  static getDateGMT3Offset(): Date {
    try {
      const date = new Date();
      return new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
    } catch (err) {
      return null;
    }
  }
  /**
   * Subtract 3 hours from date - GMT-3
   *
   * @returns {Date}
   */
  static toDateGMT3Offset(date: Date): Date {
    try {
      return new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
    } catch (err) {
      return null;
    }
  }

  /**
   * Receives a Date string and transforms in into Pt date string
   *
   * @returns {Date}
   */
  static stringToDateString(value: string): string {
    try {
      const date = new Date(value);
      if (date.isDate()){
        date.setHours(date.getHours()+3);
        return String(date.getDate()).padStart(2,'0') + '/' + String(date.getMonth() +1).padStart(2,'0') + '/' + date.getFullYear() + ' ' + 
                String(date.getHours()).padStart(2,'0') + ':' + String(date.getMinutes()).padStart(2,'0') + ':' + String(date.getSeconds()).padStart(2,'0');
      }
      return null
    } catch (err) {
      return null;
    }
  }
  
  /**
   * Subtract 3 hours from date - GMT-3 and format to BRL
   *
   * @returns {Date}
   */
  static fromDbToBRL(date: Date): string {
    try {
      return new Date(
        date.valueOf() - date.getTimezoneOffset() * 60000,
      ).toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      });
    } catch (err) {
      return null;
    }
  }

  /**
   * Returns the difference in days of two dates
   *
   * @returns {Date}
   */
  static daysBetween(biggerDate: Date, lowerDate: Date): number {
    try {
      const timeDiff = Math.abs(biggerDate.getTime() - lowerDate.getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24)); 
    } catch (err) {
      return null;
    }
  }
  
  /**
   * Returns the difference in months of two dates
   *
   * @returns {Date}
   */
  static monthsBetween(biggerDate: Date, lowerDate: Date): number {
    try {
      const timeDiff = Math.abs(biggerDate.getTime() - lowerDate.getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24 * 30)); 
    } catch (err) {
      return null;
    }
  }
}
