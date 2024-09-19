import { render, screen, fireEvent } from "@testing-library/react";
import React, { useRef } from "react";
import "@testing-library/jest-dom";
import useOutsideClick from "./hooks";

const TestComponent: React.FC<{ onClickOutside: () => void }> = ({
  onClickOutside,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, onClickOutside);

  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
};

describe("useOutsideClick", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (/ReactDOMTestUtils.act is deprecated/.test(message)) {
        return;
      }
      console.error(message);
    });
  });

  it("should call callback when clicking outside the ref element", () => {
    const handleClickOutside = jest.fn();
    render(<TestComponent onClickOutside={handleClickOutside} />);

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  it("should not call callback when clicking inside the ref element", () => {
    const handleClickOutside = jest.fn();
    render(<TestComponent onClickOutside={handleClickOutside} />);

    fireEvent.mouseDown(screen.getByTestId("inside"));
    expect(handleClickOutside).not.toHaveBeenCalled();
  });
});
