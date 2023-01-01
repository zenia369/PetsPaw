export default (list: any[]) => {
  const newList: any[][] = [];

  for (let i = 0; i < list.length; i += 5) {
    const el = list.slice(i, i + 5);
    newList.push(el);
  }

  return newList;
};
