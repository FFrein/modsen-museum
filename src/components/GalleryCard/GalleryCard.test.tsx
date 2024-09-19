import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GalleryCard from "./index";
import { Artwork } from "constants/interfaces";

jest.mock("../ButtonFav", () => ({ art }: { art: Artwork }) => (
  <button>Fav {art.title}</button>
));

const mockArtwork: Artwork = {
  id: 1,
  image_id: "12345",
  title: "Mock Artwork",
  artist_title: "Mock Artist",
  is_on_view: true,
  _score: 0,
  credit_line: "22-12-2002",
  artist_display: "artist_display",
  date_display: "22-12-2002",
  gallery_title: "gallery_title",
  place_of_origin: "place_of_origin",
  dimensions: "dimensions",
};

describe("GalleryCard Component", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation((message) => {
      if (/ReactDOMTestUtils.act is deprecated/.test(message)) {
        return;
      }
      console.error(message);
    });
  });

  test("renders artwork image with correct URL", () => {
    render(<GalleryCard art={mockArtwork} />);
    const image = screen.getByAltText("Gallery Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://www.artic.edu/iiif/2/12345/full/400,/0/default.jpg",
    );
  });

  test("renders default image if image_id is not provided", () => {
    render(<GalleryCard art={{ ...mockArtwork, image_id: "" }} />);
    const image = screen.getByAltText("Gallery Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "./TestImage.png");
  });

  test("renders artwork title and artist", () => {
    render(<GalleryCard art={mockArtwork} />);
    expect(screen.getByText("Mock Artwork")).toBeInTheDocument();
    expect(screen.getByText("Mock Artist")).toBeInTheDocument();
  });

  test("renders public status if is_on_view is true", () => {
    render(<GalleryCard art={mockArtwork} />);
    expect(screen.getByText("Public")).toBeInTheDocument();
  });

  test("renders private status if is_on_view is false", () => {
    render(<GalleryCard art={{ ...mockArtwork, is_on_view: false }} />);
    expect(screen.getByText("Private")).toBeInTheDocument();
  });

  test("renders correct URL for the artwork link", () => {
    render(<GalleryCard art={mockArtwork} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/art?id=1");
  });

  test("renders ButtonFav with correct artwork prop", () => {
    render(<GalleryCard art={mockArtwork} />);
    expect(screen.getByText(`Fav Mock Artwork`)).toBeInTheDocument();
  });
});
