import * as appServices from "./app.service";

test("get list images by ids", async () => {
  const mockIds = ["uk0SrrBbQ", "itfFA4NWS", "FAIL"];
  const responses = await appServices.getListImgById(mockIds);

  expect(responses.length).toBe(mockIds.length);
  expect(
    responses
      .map(({ id }) => id)
      .filter(Boolean)
      .toString()
  ).toBe("uk0SrrBbQ,itfFA4NWS");
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
