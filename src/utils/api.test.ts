import { fetchArtworks, fetchArt, fetchByText } from "./api";
import { ApiResponse } from "../constants/interfaces";

describe("API functions", () => {
  const mockApiResponse: ApiResponse = {
    data: [
      {
        id: 1,
        title: "Artwork Title",
        artist_title: "Artist Name",
        image_id: "image_id",
        is_on_view: true,
        _score: 0,
        credit_line: "",
        artist_display: "",
        date_display: "",
        gallery_title: "",
        place_of_origin: "",
        dimensions: "",
      },
    ],
    pagination: {
      total_pages: 1,
      current_page: 1,
      total: 1,
      limit: 0,
      offset: 0,
      prev_url: null,
      next_url: null,
    },
    info: {
      license_text: "",
      license_links: [],
      version: "",
    },
    config: {
      iiif_url: "",
      website_url: "",
    },
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch artworks successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    const response = await fetchArtworks(1, 3);

    expect(response).toEqual(mockApiResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.artic.edu/api/v1/artworks/search?query%5Bterm%5D%5Bartwork_type_id%5D=1&fields=id%2Ctitle%2Cartist_title%2Cartist_display%2Cdate_display%2Cplace_of_origin%2Cdimensions%2Ccredit_line%2Cgallery_title%2Cimage_id%2Cis_on_view&limit=3&page=1&q=`,
    );
  });

  it("should throw error when fetch artworks fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchArtworks(1, 3)).rejects.toThrow(
      "Failed to fetch artworks",
    );
  });

  it("should fetch art by ID successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    const response = await fetchArt(1);

    expect(response).toEqual(mockApiResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.artic.edu/api/v1/artworks/1?fields=id%2Ctitle%2Cartist_title%2Cartist_display%2Cdate_display%2Cplace_of_origin%2Cdimensions%2Ccredit_line%2Cgallery_title%2Cimage_id%2Cis_on_view`,
    );
  });

  it("should throw error when fetch art by ID fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchArt(1)).rejects.toThrow("Failed to fetch artworks");
  });

  it("should fetch artworks by search text successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    const response = await fetchByText("search text");

    expect(response).toEqual(mockApiResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.artic.edu/api/v1/artworks/search?q=search%20text&limit=10&fields=id,title,image_id,artist_title,is_on_view`,
    );
  });

  it("should throw error when fetch artworks by search text fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchByText("search text")).rejects.toThrow(
      "Failed to fetch artworks",
    );
  });
});
