export type ReactLogoProps = { className?: string };
export default function ReactLogo({ className }: ReactLogoProps) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" className={className}>
			<title>React Logo</title>
			<circle cx="0" cy="0" r="2.05" stroke="none" />
			<g strokeWidth="1" fill="none">
				<ellipse rx="11" ry="4.2" />
				<ellipse rx="11" ry="4.2" transform="rotate(60)" />
				<ellipse rx="11" ry="4.2" transform="rotate(120)" />
			</g>
		</svg>
	);
}
