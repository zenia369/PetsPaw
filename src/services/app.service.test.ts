import * as appServices from "./app.service";

test("get list images by ids", async () => {
  const mockDefaultIds = ["unPP08xOZ", "N-94oSJ5T"];
  const mockIds = [...mockDefaultIds, "FAIL"];
  const responses = await appServices.getListImgById(mockIds);

  expect(responses.length).toBe(mockIds.length);
  expect(
    responses
      .map(({ id }) => id)
      .filter(Boolean)
      .toString()
  ).toBe(mockDefaultIds.toString());
  expect(responses.find(({ message }) => message)).toEqual({
    message: "image item is not found by id:FAIL",
  });
});

test("upload photo", async () => {
  const response = await appServices.uploadPhoto(
    new File([""], "filename", { type: "text/html" })
  );

  expect(response.status).toBe(200);
});
