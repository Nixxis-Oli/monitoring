// Invented figures. The point of this application is to prove that two separate
// repositories can share one toolbar, not to report anything real.

export interface DayPoint {
	day: string;
	handled: number;
	escalated: number;
}

export interface Outcome {
	label: string;
	value: number;
}

export const week: DayPoint[] = [
	{ day: 'Mon', handled: 412, escalated: 38 },
	{ day: 'Tue', handled: 468, escalated: 41 },
	{ day: 'Wed', handled: 501, escalated: 62 },
	{ day: 'Thu', handled: 455, escalated: 34 },
	{ day: 'Fri', handled: 523, escalated: 47 },
	{ day: 'Sat', handled: 298, escalated: 19 },
	{ day: 'Sun', handled: 241, escalated: 15 }
];

export const outcomes: Outcome[] = [
	{ label: 'Resolved', value: 2612 },
	{ label: 'Escalated', value: 256 },
	{ label: 'Abandoned', value: 130 }
];

export const totals = {
	conversations: week.reduce((sum, d) => sum + d.handled + d.escalated, 0),
	escalationRate: 0.089,
	medianResponse: 4.2,
	satisfaction: 0.87
};
