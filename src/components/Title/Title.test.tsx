import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Title from "./index";

describe("Title Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (/ReactDOMTestUtils.act is deprecated/.test(message)) {
        return;
      }
      console.error(message);
    });
  });

  test("renders with provided title and text", () => {
    render(<Title title="Test Title" text="Test Text" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Text")).toBeInTheDocument();
  });

  test("renders with provided title and default text", () => {
    render(<Title title="Custom Title" />);

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  test("renders with provided text and default title", () => {
    render(<Title text="Custom Text" />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Text")).toBeInTheDocument();
  });
});
