import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function SearchResults() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("query");

	const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

	if (loading) return <Spinner />;
	if (error) return <ErrorMessage message={error} />;

	if (!data.meals) {
		return <h2>No results found for "{query}"</h2>;
	}

	return (
		<div>
			<h1>Search Results for "{query}"</h1>
			<div className="grid">
				{data.meals.map((meal) => (
					<RecipeCard
						key={meal.idMeal}
						meal={meal}
					/>
				))}
			</div>
		</div>
	);
}
