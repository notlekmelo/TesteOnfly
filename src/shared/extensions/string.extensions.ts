export {};

declare global {
  interface String {
    /**
     * Format string with params {0} {1} ...
     * @param replacements Values to be format
     */
    format(...replacements: string[]): string;
    /**
     * Remove accentuation
     */
    normalized(): string;
    /**
     * First letter to upper case
     */
    capitalize(): string;
  }
}

String.prototype.format = function () {
  // eslint-disable-next-line prefer-rest-params
  const args = arguments;
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};

String.prototype.normalized = function () {
  if (this == null || this == undefined) {
    return this;
  }
  return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

String.prototype.capitalize = function () {
  if (this == null || this == undefined) {
    return this;
  }
  return this.charAt(0).toUpperCase() + this.slice(1);
};
