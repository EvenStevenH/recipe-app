import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function CategoryPage() {
	const { categoryName } = useParams();

	const { data, loading, error } = useFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);

	if (loading) return <Spinner />;
	if (error) return <ErrorMessage message={error} />;

	return (
		<div>
			<h1>{categoryName} Recipes</h1>
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