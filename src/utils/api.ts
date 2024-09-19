import { ApiResponse } from "../constants/interfaces";

export const fetchArtworks = async (
  page: number = 1,
  limit: number = 3,
): Promise<ApiResponse> => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?query%5Bterm%5D%5Bartwork_type_id%5D=1&fields=id%2Ctitle%2Cartist_title%2Cartist_display%2Cdate_display%2Cplace_of_origin%2Cdimensions%2Ccredit_line%2Cgallery_title%2Cimage_id%2Cis_on_view&limit=${limit}&page=${page}&q=`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artworks");
  }
  const data: ApiResponse = await response.json();
  return data;
};

export const fetchArt = async (id: number): Promise<ApiResponse> => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/${id}?fields=id%2Ctitle%2Cartist_title%2Cartist_display%2Cdate_display%2Cplace_of_origin%2Cdimensions%2Ccredit_line%2Cgallery_title%2Cimage_id%2Cis_on_view`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artworks");
  }
  const data: ApiResponse = await response.json();
  return data;
};

export const fetchByText = async (search: string): Promise<ApiResponse> => {
  const encodedSearch = encodeURIComponent(search);
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${encodedSearch}&limit=10&fields=id,title,image_id,artist_title,is_on_view`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artworks");
  }
  const data: ApiResponse = await response.json();
  return data;
};
