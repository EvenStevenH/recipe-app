import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext(); // context API

export default function FavoriteProvider({ children }) {
	const [favorites, setFavorites] = useLocalStorage("favorites", []); // favorites as key > empty array as initial

	function addFavorite(id) {
		setFavorites((prev) => [...prev, id]); // callback create a new array with prev plus new id
	}

	function removeFavorite(id) {
		setFavorites((prev) => prev.filter((fav) => fav !== id)); // filters out the specified id
	}

	function isFavorite(id) {
		return favorites.includes(id); // check if id is in favorites array
	}

	return <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>{children}</FavoritesContext.Provider>;
}

// custom hook > avoids having to pass props down through multiple components every time
export function useFavorites() {
	return useContext(FavoritesContext);
}
