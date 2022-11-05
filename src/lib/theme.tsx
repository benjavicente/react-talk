import { createContext, useContext } from "react";

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
	if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", theme);
	return <ThemeContext.Provider value={themeStorage} {...props} />;
}

function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
}
const themeOptions = daisyui.themes.map((t) => (typeof t === "string" ? t : Object.keys(t)[0]));

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
				<Listbox.Options className="rounded-btn absolute overflow-auto bg-base-100 shadow">
					{themeOptions.map((theme) => (
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
