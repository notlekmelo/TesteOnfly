export {};

declare global {
  interface Array<T> {
    /**
     * Sum array
     */
    sum(): number;
    /**
     * Min date array
     */
    min(): Date;
    /**
     * Max date array
     */
    max(): Date;
  }
}

Array.prototype.sum = function (): number {
  if (!this) return 0;
  if (!(this instanceof Array<number>)) return 0;
  return this.reduce((acc: number, v: number) => acc + v, 0);
};

Array.prototype.min = function (): Date {
  if (!this || this.length === 0) return null;
  return new Date(Math.min.apply(null, this));
};

Array.prototype.max = function (): Date {
  if (!this || this.length === 0) return null;
  return new Date(Math.max.apply(null, this));
};
