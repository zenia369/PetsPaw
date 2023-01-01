export const currentTime = () => {
  const date = new Date();
  const minutes = date.getMinutes();

  return `${date.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export default {};
