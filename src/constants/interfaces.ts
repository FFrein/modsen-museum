import { ReactNode } from "react";

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  prev_url: string | null;
  next_url: string | null;
}

export interface Artwork {
  _score: number;
  credit_line: string;
  is_on_view: boolean;
  artist_display: string;
  date_display: string;
  artist_title: string;
  id: number;
  image_id: string;
  title: string;
  gallery_title: string;
  place_of_origin: string;
  dimensions: string;
}

export interface Info {
  license_text: string;
  license_links: string[];
  version: string;
}

export interface Config {
  iiif_url: string;
  website_url: string;
}

export interface ApiResponse {
  pagination: Pagination;
  data: Artwork[];
  info: Info;
  config: Config;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
