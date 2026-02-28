import { useEffect, useState } from "react";

export default function useFetch(url) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!url) return;

		async function fetchData() {
			try {
				setLoading(true); // show loading before fetch starts
				setError(null); // clear any previous errors

				const response = await fetch(url);
				if (!response.ok) throw new Error("Network response failed");

				const data = await response.json();
				setData(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false); // hide loading when done
			}
		}

		fetchData();
	}, [url]);

	return { data, loading, error };
}
