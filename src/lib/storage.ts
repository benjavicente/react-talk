import { useEffect, useState } from "react";

type JSONPrimitive = string | number | boolean | null;
type JSONObject = { [member: string]: JSONValue };
type JSONArray = JSONValue[];
type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export function useLocalStorage<T extends JSONValue>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(initialValue);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (!initialized) return;
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key, initialized]);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const storedValue = localStorage.getItem(key);
		if (storedValue) setValue(JSON.parse(storedValue));

		const listener = ({ newValue: v, key: k }: StorageEvent) => {
			if (k === key && v) setValue(JSON.parse(v));
		};
		window.addEventListener("storage", listener);
		setInitialized(true);
		return () => window.removeEventListener("storage", listener);
	}, [key]);

	return [value, setValue] as const;
}
