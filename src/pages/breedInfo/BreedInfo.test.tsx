import { LINK } from "../../routes/links";
import { getDataItemById } from "../../test/data/data";
import { renderWithRoute, screen } from "../../test/test-utils";

const mockBreedId = "EHG3sOpAM";
const mockIndex = 0;

beforeAll(() => {
  vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(actual as any),
      useLocation: () => ({
        state: {
          index: mockIndex,
        },
      }),
    };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

test("open breed page", async () => {
  const breed = getDataItemById(mockBreedId)?.breeds[0];

  await renderWithRoute({ route: `/${LINK.breeds}/${mockBreedId}` });

  expect(screen.getByLabelText(/dots/i).children[mockIndex]).toHaveClass(
    "active"
  );
  expect(screen.getByTestId("name").textContent).toBe(breed?.name);
  expect(screen.getByTestId("description").textContent).toBe(
    breed?.description
  );
  expect(screen.getByTestId("origin").textContent).toBe(
    `Origin: ${breed?.origin}`
  );
  expect(screen.getByTestId("weight").textContent).toBe(
    `Weight: ${breed?.weight.metric} kgs`
  );
  expect(screen.getByTestId("life_span").textContent).toBe(
    `Life span: ${breed?.life_span} years`
  );
  expect(screen.getByTestId("temperament").textContent).toBe(
    `Temperament: ${breed?.temperament}`
  );
});
