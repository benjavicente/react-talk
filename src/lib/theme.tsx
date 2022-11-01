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
			<div className="relative dropdown">
				<Listbox.Button className="btn relative flex gap-1">
					<span>{currentTheme}</span>
					<ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
				</Listbox.Button>
				<Listbox.Options className="absolute shadow bg-base-100 rounded-btn overflow-clip">
					{daisyui.themes.map((theme) => (
						<Listbox.Option
							key={theme}
							value={theme}
							className={({ active }) =>
								classNames(
									"relative select-none flex gap-2 py-2 px-4 bg-neutral text-neutral-content cursor-pointer",
									active ? "bg-neutral-focus" : ""
								)
							}
						>
							<div className="flex gap-0.5 bg-transparent" data-theme={theme}>
								<span className="bg-primary w-1" />
								<span className="bg-secondary w-1" />
								<span className="bg-base-200 w-1" />
							</div>
							<div>{theme}</div>
						</Listbox.Option>
					))}
				</Listbox.Options>
			</div>
		</Listbox>
	);
}
