import { baseURL, rest, server } from "../../test/server";
import { LINK } from "../../routes/links";
import { renderWithRoute, screen, userEvent } from "../../test/test-utils";

test(
  "change category field",
  async () => {
    const mockCategory = "Munchkin";
    await renderWithRoute({ route: `/${LINK.gallery}` });

    await userEvent.click(screen.getByLabelText("category dropdown"));
    await userEvent.click(screen.getByRole("button", { name: mockCategory }));

    expect(screen.getByLabelText("category dropdown list")).not.toBeVisible();

    await userEvent.click(
      screen.getByRole("button", { name: /fetch new pets photos/i })
    );

    expect(screen.getAllByLabelText(/gallery item/i)).not.toBe(0);
    expect(
      screen
        .getAllByRole("link", { name: mockCategory })
        .every((node) => node.textContent === mockCategory)
    ).toBeTruthy();
  },
  { timeout: 10_000 }
);

test("change limit field", async () => {
  const mockLimit = "10";
  await renderWithRoute({ route: `/${LINK.gallery}` });

  await userEvent.click(screen.getByLabelText("limit dropdown"));
  await userEvent.click(screen.getByRole("button", { name: mockLimit }));

  expect(screen.getByLabelText("limit dropdown list")).not.toBeVisible();

  await userEvent.click(
    screen.getByRole("button", { name: /fetch new pets photos/i })
  );

  expect(screen.getAllByLabelText(/gallery item/i)).toHaveLength(10);
});

describe("upload photo", () => {
  const mockFileName = "filename.png";
  const mockCreateObjectURL = vi.fn().mockImplementation(() => mockFileName);
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  let mockFile!: File;

  globalThis.URL.createObjectURL = mockCreateObjectURL;

  beforeEach(() => {
    mockFile = new File(["(⌐□_□)"], mockFileName, { type: "image/png" });
  });
  afterEach(() => {
    mockCreateObjectURL.mockClear();
    consoleErrorSpy.mockClear();
  });

  test("upload file successful", async () => {
    await renderWithRoute({ route: `/${LINK.gallery}` });

    await userEvent.click(screen.getByRole("button", { name: /upload/i }));
    await userEvent.upload(screen.getByTestId(/uploader/i), mockFile);

    expect(
      screen.getByRole("img", { name: /uploaded content/i })
    ).toHaveAttribute("src", mockFileName);
    expect(mockCreateObjectURL).toHaveBeenCalledOnce();

    await userEvent.click(
      screen.getByRole("button", { name: /upload photo/i })
    );

    expect(screen.getByTestId("successful uploaded")).toBeInTheDocument();
  });

  test("upload file fail", async () => {
    server.use(
      rest.post(`${baseURL}images/upload`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    await renderWithRoute({ route: `/${LINK.gallery}` });

    await userEvent.click(screen.getByRole("button", { name: /upload/i }));
    await userEvent.upload(screen.getByTestId(/uploader/i), mockFile);

    expect(
      screen.getByRole("img", { name: /uploaded content/i })
    ).toHaveAttribute("src", mockFileName);
    expect(mockCreateObjectURL).toHaveBeenCalledOnce();

    await userEvent.click(
      screen.getByRole("button", { name: /upload photo/i })
    );

    expect(screen.getByTestId("fail uploaded")).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalledOnce();
  });
});
