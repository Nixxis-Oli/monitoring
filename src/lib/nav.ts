import Bell from '@lucide/svelte/icons/bell';
import Headset from '@lucide/svelte/icons/headset';
import Inbox from '@lucide/svelte/icons/inbox';
import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
import ListChecks from '@lucide/svelte/icons/list-checks';
import MessagesSquare from '@lucide/svelte/icons/messages-square';
import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
import type { Component } from 'svelte';

export interface NavItem {
	label: string;
	href: string;
	icon: Component;
	ready?: boolean;
}

export interface NavSection {
	title: string;
	items: NavItem[];
}

// Deliberately different from bot-studio's: each application owns its own
// navigation, only the toolbar's right-hand end is shared. What the two have in
// common is the treatment - an icon per entry - not the entries themselves.
export const navSections: NavSection[] = [
	{
		title: 'Live',
		items: [
			{ label: 'Overview', href: '/', icon: LayoutDashboard, ready: true },
			{ label: 'Queues', href: '/queues', icon: Inbox },
			{ label: 'Agents', href: '/agents', icon: Headset }
		]
	},
	{
		title: 'History',
		items: [
			{ label: 'Conversations', href: '/conversations', icon: MessagesSquare },
			{ label: 'Incidents', href: '/incidents', icon: TriangleAlert }
		]
	},
	{
		title: 'Alerting',
		items: [
			{ label: 'Rules', href: '/rules', icon: ListChecks },
			{ label: 'Channels', href: '/channels', icon: Bell }
		]
	}
];
