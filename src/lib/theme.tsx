import { createContext, useContext, useEffect } from "react";

import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { daisyui } from "../../tailwind.config";

import { useLocalStorage } from "./storage";
import { classNames } from "./utils";

type ThemeContextPayload = [theme: string, setTheme: (theme: string) => void];

const ThemeContext = createContext<ThemeContextPayload | undefined>(undefined);

export function ThemeProvider(props) {
	const themeStorage = useLocalStorage("rbv-theme", "light");
	const [theme] = themeStorage;
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);
	return <ThemeContext.Provider value={themeStorage} {...props} />;
}

function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}

export function ThemeSwitcher() {
	const [currentTheme, setCurrentTheme] = useTheme();
	// Select the theme from the storage
	return (
		<Listbox value={currentTheme} onChange={setCurrentTheme}>
			<div className="dropdown relative">
				<Listbox.Button className="btn relative flex gap-1">
					<span>{currentTheme}</span>
					<ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
				</Listbox.Button>
				<Listbox.Options className="rounded-btn absolute overflow-clip bg-base-100 shadow">
					{daisyui.themes.map((theme) => (
						<Listbox.Option
							key={theme}
							value={theme}
							className={({ active }) =>
								classNames(
									"relative flex cursor-pointer select-none gap-2 bg-neutral py-2 px-4 text-neutral-content",
									active ? "bg-neutral-focus" : ""
								)
							}
						>
							<div className="flex gap-0.5 bg-transparent" data-theme={theme}>
								<span className="w-1 bg-primary" />
								<span className="w-1 bg-secondary" />
								<span className="w-1 bg-base-200" />
							</div>
							<div>{theme}</div>
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	);
}
