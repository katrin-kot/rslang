export function unique(arr) {
  const result = [];

  arr.forEach((str) => {
    if (!result.includes(str)) {
      result.push(str);
    }
  });
  return result;
}
