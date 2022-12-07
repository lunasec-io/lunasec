export const reorder = (list: Array<unknown>, from: number, to: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(from, 1);
  result.splice(to, 0, removed);

  return result;
};
