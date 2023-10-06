import { getItemLS, setItemLS } from "./localStorage";

export const USER_ID = "user_id";

export default (): string => {
  try {
    const uid = getItemLS<string>(USER_ID);
    return uid;
  } catch (error) {
    const newUid = Date.now().toString();
    setItemLS(USER_ID, newUid);
    return newUid;
  }
};
