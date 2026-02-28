import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function RecipeDetail() {
	const { recipeId } = useParams();
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();

	const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);

	if (loading) return <Spinner />;
	if (error) return <ErrorMessage message={error} />;

	const meal = data.meals[0]; // first recipe object from response (meals array)

	// API's strIngredient provides up to 20 > empty slots are falsy and skipped
	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
		}
	}

	const favorite = isFavorite(recipeId); // check if recipe is already in user's favorites

	return (
		<div className="detail">
			<h1>{meal.strMeal}</h1>
			<div>
				<img
					src={meal.strMealThumb}
					alt={meal.strMeal}
				/>
			</div>

			<button
				onClick={() => (favorite ? removeFavorite(recipeId) : addFavorite(recipeId))}
				className="favorite-btn"
			>
				{favorite ? "Remove from Favorites" : "Add to Favorites"}
			</button>

			<h3>Ingredients</h3>
			<ul>
				{ingredients.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>

			<h3>Instructions</h3>
			<p>{meal.strInstructions}</p>
		</div>
	);
}
