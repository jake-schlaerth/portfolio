export function* cyclicGenerator(array: string[]) {
  let index = 0;
  while (true) {
    if (index >= array.length) {
      index = 0;
    }
    yield array[index++];
  }
}
