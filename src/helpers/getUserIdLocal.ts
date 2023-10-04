import { getItemLS, setItemLS } from "./localStorage";

export default (): string => {
  try {
    const uid = getItemLS<string>("user_id");
    return uid;
  } catch (error) {
    const newUid = Date.now().toString();
    setItemLS("user_id", newUid);
    return newUid;
  }
};
