import { setupServer } from "msw/node";
import handlers, { baseURL } from "./handlers";

const server = setupServer(...handlers);

export * from "msw";
export { server, baseURL };
