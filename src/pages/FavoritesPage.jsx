import { useFavorites } from "../context/FavoritesContext";
import useFetch from "../hooks/useFetch";
import RecipeCard from "../components/RecipeCard";

export default function FavoritesPage() {
	const { favorites } = useFavorites();

	if (favorites.length === 0) {
		return <h2>No favorites yet. Browse and add some!</h2>;
	}

	return (
		<div>
			<h1>Your Favorites</h1>
			<div className="grid">
				{favorites.map((id) => (
					<FavoriteItem
						key={id}
						id={id}
					/>
				))}
			</div>
		</div>
	);
}

function FavoriteItem({ id }) {
	const { data, loading } = useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

	if (loading) return null; // prevent rendering card before data's fully loaded
	if (!data?.meals?.[0]) return null; // prevent accessing props on undefined values

	return <RecipeCard meal={data.meals[0]} />;
}
