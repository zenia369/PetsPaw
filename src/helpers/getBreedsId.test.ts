import { IDropDownItem } from "../models/IDropDownList";
import { ALL_BREEDS } from "../services/breeds.service";
import getBreedsId from "./getBreedsId";

const mockDefaulBreeds: IDropDownItem[] = [
  {
    active: false,
    name: "name 2",
    id: 2,
  },
  {
    active: false,
    name: "name 3",
    id: 3,
  },
];

test("should return breeds ids when active is ALL_BREEDS", () => {
  const mockBreeds: IDropDownItem[] = [
    {
      active: true,
      name: ALL_BREEDS,
      id: 1,
    },
    ...mockDefaulBreeds,
  ];

  const breedsIds = getBreedsId(mockBreeds);

  expect(breedsIds).toBe([2, 3].toString());
});

test("should return breed id when active is not ALL_BREEDS", () => {
  const mockBreeds: IDropDownItem[] = [
    {
      active: true,
      name: "name 1",
      id: 1,
    },
    ...mockDefaulBreeds,
  ];

  const breedsIds = getBreedsId(mockBreeds);

  expect(breedsIds).toBe("1");
});

test("should return empty string", () => {
  const breedsIds = getBreedsId(undefined);

  expect(breedsIds).toBe("");
});
