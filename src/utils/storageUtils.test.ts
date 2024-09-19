import {
  addToFavorites,
  removeFromFavorites,
  getFavourites,
  FollowUnfollow,
} from "./storage";
import { Artwork } from "constants/interfaces";

describe("Favorites Management", () => {
  const artwork: Artwork = {
    id: 1,
    title: "Mona Lisa",
    artist_title: "Leonardo da Vinci",
    image_id: "mona_lisa",
    is_on_view: true,
    _score: 0,
    credit_line: "",
    artist_display: "",
    date_display: "",
    gallery_title: "",
    place_of_origin: "",
    dimensions: "",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test("addToFavorites should add artwork to favorites", () => {
    addToFavorites(artwork);

    const favorites = getFavourites();
    expect(favorites).toHaveLength(1);
    expect(favorites[0]).toEqual(artwork);
  });

  test("removeFromFavorites should remove artwork from favorites", () => {
    addToFavorites(artwork);
    removeFromFavorites(artwork.id);

    const favorites = getFavourites();
    expect(favorites).toHaveLength(0);
  });

  test("getFavourites should return empty array if no favorites", () => {
    const favorites = getFavourites();
    expect(favorites).toEqual([]);
  });

  test("FollowUnfollow should add artwork if not in favorites", () => {
    FollowUnfollow(artwork);

    const favorites = getFavourites();
    expect(favorites).toHaveLength(1);
    expect(favorites[0]).toEqual(artwork);
  });

  test("FollowUnfollow should remove artwork if already in favorites", () => {
    addToFavorites(artwork);
    FollowUnfollow(artwork);

    const favorites = getFavourites();
    expect(favorites).toHaveLength(0);
  });
});
