import { rest } from "msw";
import { getRandomDataItem, getDataItemById, data } from "../data/data";

export const baseURL = import.meta.env.VITE_BASE_URL;

const handlers = [
  rest.get(`${baseURL}images/search`, (req, res, ctx) => {
    const order = req.url.searchParams.get("order") as "ASC" | "DESC";
    const limit = Number(req.url.searchParams.get("limit"));
    const breedsIds = req.url.searchParams
      .get("breed_ids")
      ?.split(",") as string[];

    if (order && limit && breedsIds) {
      const resultItems = data
        .filter(({ breeds }) => breedsIds.includes(breeds[0].id))
        .sort((a, b) => {
          if (order === "ASC")
            return a.breeds[0].id.localeCompare(b.breeds[0].id);

          return b.breeds[0].id.localeCompare(a.breeds[0].id);
        });

      return res(ctx.status(200), ctx.json(resultItems.slice(0, limit)));
    }

    return res(ctx.status(200), ctx.json(getRandomDataItem()));
  }),
  rest.get(`${baseURL}images/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const item = await getDataItemById(id as string);

    if (item && id !== "FAIL") {
      return res(ctx.status(200), ctx.json(item));
    }
    return res(
      ctx.status(400),
      ctx.json({ message: `image item is not found by id:${id}` })
    );
  }),
  rest.get(`${baseURL}breeds`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(data.map((d) => d.breeds[0])));
  }),
  rest.post(`${baseURL}images/upload`, async (req, res, ctx) => {
    const body = (await req.arrayBuffer()) as unknown as FormData;
    const file = body.get("file");
    const userId = body.get("sub_id");

    if (!file || !userId) {
      return res(ctx.status(400));
    }

    return res(ctx.status(200));
  }),
];

export default handlers;
