import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		const stored = localStorage.getItem(key);
		return stored
			? JSON.parse(stored) // use data in localStorage, if it exists
			: initialValue; // default value if nothing is stored
	});

    // run whenever key or value changes
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
