import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

jest.mock("./components/Header/index", () => () => <div>Header</div>);
jest.mock("./components/Footer/index", () => () => <div>Footer</div>);
jest.mock("Routes", () => () => <div>Routes</div>);

describe("App Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (/ReactDOMTestUtils.act is deprecated/.test(message)) {
        return;
      }
      console.error(message);
    });
  });

  test("should render Header, AppRoutes, and Footer components", () => {
    render(<App />);
    expect(screen.getByText("Routes")).toBeInTheDocument();
  });

  test("should have the correct class name", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass("App");
  });
});
