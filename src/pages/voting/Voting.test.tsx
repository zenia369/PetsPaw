import { LINK } from "../../routes/links";
import {
  renderWithRoute,
  screen,
  userEvent,
  waitForLoadingToFinish,
} from "../../test/test-utils";

async function renderVotingPage() {
  await renderWithRoute({ route: `/${LINK.voting}` });

  expect(screen.queryAllByLabelText(/reaction item/i)).toHaveLength(0);
  expect(screen.getByText(/No saved reaction/i)).toBeInTheDocument();
}

test("user press like button", async () => {
  await renderVotingPage();

  await userEvent.click(screen.getByRole("button", { name: /add to likes/i }));

  expect(screen.getAllByLabelText(/reaction item/i)).toHaveLength(1);

  await userEvent.click(screen.getByRole("link", { name: LINK.pageLikes }));
  await waitForLoadingToFinish();

  expect(screen.queryByText(/No item found/i)).not.toBeInTheDocument();
  expect(screen.getAllByLabelText(/gallery item/i)).toHaveLength(1);
});

test("user press favourite button", async () => {
  await renderVotingPage();

  await userEvent.click(
    screen.getByRole("button", { name: /add to favourites/i })
  );

  expect(screen.getAllByLabelText(/reaction item/i)).toHaveLength(1);

  await userEvent.click(
    screen.getByRole("link", { name: LINK.pageFavourites })
  );
  await waitForLoadingToFinish();

  expect(screen.queryByText(/No item found/i)).not.toBeInTheDocument();
  expect(screen.getAllByLabelText(/gallery item/i)).toHaveLength(1);

  await userEvent.click(screen.getByLabelText(/remove favourite/i));

  expect(screen.queryAllByLabelText(/reaction item/i)).toHaveLength(0);

  await userEvent.click(
    screen.getByRole("button", { name: /back to previous page/i })
  );

  expect(screen.queryAllByLabelText(/reaction item/i)).toHaveLength(0);
  expect(screen.getByText(/No saved reaction/i)).toBeInTheDocument();
});

test("user press dislike button", async () => {
  await renderVotingPage();

  await userEvent.click(
    screen.getByRole("button", { name: /add to dislikes/i })
  );

  expect(screen.getAllByLabelText(/reaction item/i)).toHaveLength(1);

  await userEvent.click(screen.getByRole("link", { name: LINK.pageDislikes }));
  await waitForLoadingToFinish();

  expect(screen.queryByText(/No item found/i)).not.toBeInTheDocument();
  expect(screen.getAllByLabelText(/gallery item/i)).toHaveLength(1);
});
