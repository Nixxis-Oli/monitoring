const number = new Intl.NumberFormat('en-GB');
const percent = new Intl.NumberFormat('en-GB', { style: 'percent', maximumFractionDigits: 1 });

export function formatNumber(value: number): string {
	return number.format(value);
}

export function formatPercent(value: number): string {
	return percent.format(value);
}
