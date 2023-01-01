import { getItemLS, setItemLS } from "./LocalStorage";

export default (): string => {
  try {
    const uid = getItemLS("user_id") as string;
    return uid;
  } catch (error) {
    const newUid = Date.now().toString();
    setItemLS("user_id", newUid);
    return newUid;
  }
};
