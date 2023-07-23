export class ArrayUtil {
  static findDuplicates(arr: any[] | []) {
    const sortedArray = arr.slice().sort();
    const results = [];
    for (let i = 0; i < sortedArray.length - 1; i++) {
      if (sortedArray[i + 1] == sortedArray[i]) {
        results.push(sortedArray[i]);
      }
    }
    return results;
  }

  static sum(arr: any[]) {
    return arr.reduce((acc, v) => acc + v, 0);
  }
}
