export function getDate(milliseconds: number) {
	return new Date(milliseconds).toLocaleDateString('ru');
}

export function getTime(milliseconds: number) {
	return new Date(milliseconds).toLocaleTimeString('ru').slice(0, -3);
}
