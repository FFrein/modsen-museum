import { Artwork } from "constants/interfaces";

export const addToFavorites = (artwork: Artwork) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  favorites.push(artwork);

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const removeFromFavorites = (artworkId: number) => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  const updatedFavorites = favorites.filter(
    (artwork: Artwork) => artwork.id !== artworkId,
  );

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const getFavourites = (): Artwork[] => {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  return storedFavorites;
};

export const FollowUnfollow = (art: Artwork) => {
  let fav = getFavourites() as unknown as Artwork[];
  if (fav.filter((e) => e.id == art.id).length != 0) {
    removeFromFavorites(art.id);
  } else {
    addToFavorites(art);
  }
};
