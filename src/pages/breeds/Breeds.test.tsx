import { LINK } from "../../routes/links";
import { renderWithRoute, screen, userEvent } from "../../test/test-utils";

test("change category field", async () => {
  const mockCategoryItem = "Munchkin";
  await renderWithRoute({ route: `/${LINK.breeds}` });

  await userEvent.click(
    screen.getByRole("button", {
      name: "category dropdown",
    })
  );
  await userEvent.click(screen.getByRole("button", { name: mockCategoryItem }));

  expect(screen.getByLabelText("category dropdown list")).not.toBeVisible();
  expect(screen.getAllByLabelText(/gallery item/i)).not.toBe(0);
  expect(
    screen
      .getAllByRole("link", { name: mockCategoryItem })
      .every((node) => node.textContent === mockCategoryItem)
  ).toBeTruthy();
});

test("change limit field", async () => {
  const mockLimitItem = "10";
  await renderWithRoute({ route: `/${LINK.breeds}` });

  expect(screen.getAllByLabelText(/gallery item/i)).toHaveLength(5);

  await userEvent.click(screen.getByRole("button", { name: "limit dropdown" }));
  await userEvent.click(screen.getByRole("button", { name: mockLimitItem }));

  expect(screen.getByLabelText("limit dropdown list")).not.toBeVisible();
  expect(screen.getAllByLabelText(/gallery item/i)).toHaveLength(10);
});
