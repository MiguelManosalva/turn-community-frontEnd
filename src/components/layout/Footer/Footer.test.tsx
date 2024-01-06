import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  it("renders the footer correctly", () => {
    render(<Footer />);

    expect(screen.getByText("© 2021, made with")).toBeTruthy();
    expect(screen.getByText("Creative Tim")).toBeTruthy();
    expect(screen.getByText("for a better web.")).toBeTruthy();

    expect(screen.getByText("List Item 1")).toBeTruthy();
    expect(screen.getByText("List Item 2")).toBeTruthy();
    expect(screen.getByText("List Item 3")).toBeTruthy();
  });
});
