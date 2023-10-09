import { hasDataItem } from "../test/data/data";
import votingService from "./voting.service";

test("get voting item", async () => {
  const response = await votingService();

  expect(hasDataItem(response.id)).toBeTruthy();
});
