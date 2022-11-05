export const currentTime = () =>
	new Date().toLocaleString("es-ES", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		fractionalSecondDigits: 2,
	});
