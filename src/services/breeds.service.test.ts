import { AxiosError } from "axios";
import { hasDataItem } from "../test/data/data";
import * as breedService from "./breeds.service";

test("get breed by id", async () => {
  const response = await breedService.getBreedById("EHG3sOpAM");

  expect(hasDataItem(response.id)).toBeTruthy();
});

test("get breed by wrong id should fail", async () => {
  const { response } = (await breedService
    .getBreedById("FAIL")
    .catch((e) => e)) as AxiosError<{ message: string }>;

  expect(response?.status).toBe(400);
  expect(response?.data.message).toBe("image item is not found by id:FAIL");
});

test("get breeds", async () => {
  const response = await breedService.getBreeds();

  expect(response[0]).toEqual(breedService.MOCK_BREEDS_ITEM);
  expect(Array.isArray(response)).toBeTruthy();
});

test("get breeds with params", async () => {
  const mockBreedsIds = "abys,munc";
  const response = await breedService.getBreedsWithParams({
    limit: 10,
    order: "ASC",
    breed_ids: mockBreedsIds,
  });

  const resBreedsIds = Object.keys(
    response.reduce((acc, { breeds }) => {
      const { id } = breeds[0];

      return { ...acc, [id]: id };
    }, {})
  ).toString();

  expect(response.length).not.toBe(0);
  expect(resBreedsIds).toBe(mockBreedsIds);
  expect(response.at(0)!.breeds.at(0)!.id.startsWith("a")).toBeTruthy();
  expect(response.at(-1)!.breeds.at(-1)!.id.startsWith("m")).toBeTruthy();
});
