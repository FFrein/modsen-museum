import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ButtonFav from "./index";
import * as storage from "../../utils/storage";

jest.mock("../../utils/storage", () => ({
  FollowUnfollow: jest.fn(),
  getFavourites: jest.fn(),
}));

const mockArtwork = {
  id: 1,
  title: "Sample Artwork",
  _score: 2,
  credit_line: "3-3-3",
  is_on_view: true,
  artist_display: "10-08-1980",
  date_display: "20-12-2000",
  artist_title: "Jhon Dou",
  image_id: "asdskluhfals-a12414s-da424avsd",
  gallery_title: "gallery_title",
  place_of_origin: "Polish",
  dimensions: "dimensions",
};

describe("ButtonFav Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (/ReactDOMTestUtils.act is deprecated/.test(message)) {
        return;
      }
      console.error(message);
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the component with non-favorite state", () => {
    (storage.getFavourites as jest.Mock).mockReturnValue([]);

    render(<ButtonFav art={mockArtwork} />);

    const button = screen.getByRole("img");
    expect(button).toHaveAttribute("src", "./bookmark2.png");
    expect(button.parentElement).toHaveClass("wrapper");
  });

  test("should render the component with favorite state", () => {
    (storage.getFavourites as jest.Mock).mockReturnValue([mockArtwork]);

    render(<ButtonFav art={mockArtwork} />);

    const button = screen.getByRole("img");
    expect(button).toHaveAttribute("src", "./bookmark2.png");
    expect(button.parentElement).toHaveClass("wrapperFav");
  });

  test("should toggle favorite state on click", () => {
    (storage.getFavourites as jest.Mock).mockReturnValue([]);

    render(<ButtonFav art={mockArtwork} />);

    const button = screen.getByRole("img");
    fireEvent.click(button);

    expect(storage.FollowUnfollow).toHaveBeenCalledWith(mockArtwork);
    expect(button.parentElement).toHaveClass("wrapperFav");
  });

  test("should handle follow/unfollow correctly", () => {
    (storage.getFavourites as jest.Mock).mockReturnValue([mockArtwork]);

    render(<ButtonFav art={mockArtwork} />);

    const button = screen.getByRole("img");
    fireEvent.click(button);

    expect(storage.FollowUnfollow).toHaveBeenCalledWith(mockArtwork);
    expect(button.parentElement).toHaveClass("wrapper");
  });
});
