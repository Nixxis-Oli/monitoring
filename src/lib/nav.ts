export interface NavItem {
	label: string;
	href: string;
	ready?: boolean;
}

export interface NavSection {
	title: string;
	items: NavItem[];
}

// Deliberately different from bot-studio's: each application owns its own
// navigation, only the toolbar's right-hand end is shared.
export const navSections: NavSection[] = [
	{
		title: 'Live',
		items: [
			{ label: 'Overview', href: '/', ready: true },
			{ label: 'Queues', href: '/queues' },
			{ label: 'Agents', href: '/agents' }
		]
	},
	{
		title: 'History',
		items: [
			{ label: 'Conversations', href: '/conversations' },
			{ label: 'Incidents', href: '/incidents' }
		]
	},
	{
		title: 'Alerting',
		items: [
			{ label: 'Rules', href: '/rules' },
			{ label: 'Channels', href: '/channels' }
		]
	}
];
