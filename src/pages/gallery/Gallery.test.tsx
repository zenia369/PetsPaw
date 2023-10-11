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
