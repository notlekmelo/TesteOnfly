import { format } from 'date-fns';

export {};
declare global {
  interface Date {
    /**
     * Add days at date
     * @param {number} days
     * @return {Date} Date adds days
     */
    addDays(days: number): Date;
    /**
     * Check the weather that date is now
     */
    isToday(): boolean;
    /**
     * Clone date
     */
    clone(): Date;
    /**
     * Check the weather date is weekend
     * @returns {boolean} true weekend false other else
     */
    isWeekend(): boolean;
    /**
     * Check the weather is date is equals (ignore time)
     * @returns {boolean} true equals false other else
     */
    isSame(date: Date): boolean;
    /**
     * Format date in full
     * @returns {string} Hoje/Amanha/Ontem 12 de 12 de 2012
     */
    getStringDate(): string;
    /**
     * Format date in yyyy-MM-dd
     * @returns {string}
     */
    formatIso(): string;
    /**
     * Get month name
     * @returns {string} Month name
     */
    getMonthName(): string;
    /**
     * Get date with GMT-3
     * Subtract 3 hours from date - GMT-3
     *
     * @returns {Date}
     */
    toDateGMT3Offset(): Date;
    /**
     * Parse date to GMT-3
     * Subtract 3 hours from date - GMT-3
     *
     * @returns {Date}
     */
    parseDateGMT3Offset(date: Date): Date;
    /**
     * Check weather date is valid
     *
     * False Invalid Date
     */
    isDate(): boolean;
  }
}

Date.prototype.addDays = function (days: number): Date {
  if (!days) return this;
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const date = this;
  date.setDate(date.getDate() + days);

  return date;
};

Date.prototype.isToday = function (): boolean {
  const today = new Date();
  return this.isEquals(today);
};

Date.prototype.clone = function (): Date {
  return new Date(+this);
};

Date.prototype.isWeekend = function (): boolean {
  return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSame = function (date: Date): boolean {
  const now = new Date(this);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return (
    date &&
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  );
};

Date.prototype.getStringDate = function (): string {
  const today = new Date();
  if (this.getMonth() == today.getMonth() && this.getDay() == today.getDay()) {
    return 'Hoje';
    //return "Today";
  } else if (
    this.getMonth() == today.getMonth() &&
    this.getDay() == today.getDay() + 1
  ) {
    return 'Amanhã';
    //return "Tomorrow";
  } else if (
    this.getMonth() == today.getMonth() &&
    this.getDay() == today.getDay() - 1
  ) {
    return 'Ontem';
    //return "Yesterday";
  } else {
    return (
      this.getDay() +
      ' de ' +
      this.monthNames[this.getMonth()] +
      ' de ' +
      this.getFullYear()
    );
    //return this.monthNames[this.getMonth()] + ' ' + this.getDay() + ', ' +  this.getFullYear();
  }
};

Date.prototype.getMonthName = function (): string {
  //Month names in Brazilian Portuguese
  //Month names in English
  //let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  //getMonth begin from 0
  return monthNames[this.getMonth()];
};

Date.prototype.toDateGMT3Offset = function (): Date {
  try {
    return new Date(this.valueOf() - this.getTimezoneOffset() * 60000);
  } catch (err) {
    return null;
  }
};

Date.prototype.parseDateGMT3Offset = function (date: Date): Date {
  try {
    return new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
  } catch (err) {
    return null;
  }
};

Date.prototype.formatIso = function (): string {
  return format(this, 'yyyy-MM-dd');
};

Date.prototype.isDate = function () {
  return this instanceof Date && !isNaN(this);
};
