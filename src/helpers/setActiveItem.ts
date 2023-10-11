// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (list: any[], arg: string | number, nameOption: string) => {
  const newList = list.map((el) => {
    if (el[nameOption] === arg) {
      return { ...el, active: true };
    }
    return { ...el, active: false };
  });

  const newActive = newList.find((el) => el.active)[nameOption] ?? null;

  return {
    newList,
    newActive,
  };
};
