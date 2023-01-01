import axios from "axios";

import getUserIdLocal from "../helpers/getUserIdLocal";

const appApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  params: {
    sub_id: getUserIdLocal(),
  },
  headers: {
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

export default appApi;
