export class SleepUtil {
  /**
   * Sleep miliseconds
   */
  static sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  /**
   * Sleep seconds
   */
  static sleepSeconds(ms: number) {
    return new Promise((r) => setTimeout(r, ms * 1000));
  }
}
