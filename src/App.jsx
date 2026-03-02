import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FavoritesProvider from "./context/FavoritesContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetail from "./pages/RecipeDetail";
import FavoritesPage from "./pages/FavoritesPage";
import SearchResults from "./pages/SearchResults";

export default function App() {
	return (
		<BrowserRouter>
			<FavoritesProvider>
				<Navbar />
				<Routes>
					<Route
						path="/home"
						element={<Home />}
					/>
					<Route
						path="/category/:categoryName"
						element={<CategoryPage />}
					/>
					<Route
						path="/recipe/:recipeId"
						element={<RecipeDetail />}
					/>
					<Route
						path="/favorites"
						element={<FavoritesPage />}
					/>
					<Route
						path="/search"
						element={<SearchResults />}
					/>
				</Routes>
			</FavoritesProvider>
		</BrowserRouter>
	);
}
