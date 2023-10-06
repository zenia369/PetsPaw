export default (list: any[], step = 5) => {
  const newList: any[][] = [];

  for (let i = 0; i < list.length; i += step) {
    const el = list.slice(i, i + step);

    newList.push(el);
  }

  return newList;
};
