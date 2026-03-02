import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate(); // for routing to "/search?query=..."

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!searchTerm.trim()) return;

		navigate(`/search?query=${searchTerm}`);
		setSearchTerm("");
	};

	return (
		<nav className="navbar">
			<div className="nav-links">
				<Link to="/home">Home</Link>
				<Link to="/favorites">Favorites</Link>
			</div>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search recipes..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
		</nav>
	);
}
