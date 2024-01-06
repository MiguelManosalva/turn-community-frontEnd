import { render, screen } from "@testing-library/react";
import Main from "./Main";

test("example test", () => {
  render(
    <Main>
      <p>Example Text</p>{" "}
    </Main>
  );

  const element = screen.getByText("Example Text");
  expect(element).toBeDefined();
});
