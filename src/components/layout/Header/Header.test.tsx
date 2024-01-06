import { fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  it("renders without errors", () => {
    render(<Header />);
    expect(screen.getByText("Pages")).toBeTruthy();
    expect(screen.getByText("Sign in")).toBeTruthy();
  });

  it("displays the correct breadcrumb and subName", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("Dashboard")).toBeTruthy();
  });

  it("triggers the onPress event when clicked", () => {
    const mockOnPress = jest.fn();
    render(<Header />);
    fireEvent.click(screen.getByText("Sign in"));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
