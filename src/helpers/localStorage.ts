export const getItemLS = <T>(colectionName: string): T => {
  if (!colectionName) throw new Error("empy colectionName");

  const item = localStorage.getItem(colectionName);
  if (!item) throw new Error("empy item");

  const data = JSON.parse(item);
  return data;
};

export const setItemLS = (colectionName: string, data: any) => {
  localStorage.setItem(colectionName, JSON.stringify(data));
};
