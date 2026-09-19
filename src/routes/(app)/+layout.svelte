<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { apps, palettes } from '$lib/apps';
	import { navSections } from '$lib/nav';
	import { ToolbarActions } from '@nixxis-oli/ui';

	let { children } = $props();

	// This application's own sidebar: different sections, different labels. Only
	// the cluster at the right of the toolbar comes from the shared package.
	let open = $state(false);
</script>

<div class="bg-background flex min-h-screen w-full">
	{#if open}
		<button
			type="button"
			aria-label="Close navigation"
			class="fixed inset-0 z-40 bg-black/50 md:hidden"
			onclick={() => (open = false)}
		></button>
	{/if}

	<div class="hidden w-64 shrink-0 md:block"></div>

	<aside
		class="bg-card fixed inset-y-0 z-50 flex h-svh w-64 flex-col border-r transition-[left] duration-200 ease-linear md:left-0 md:z-20 {open
			? 'left-0'
			: 'left-[-16rem]'}"
	>
		<div class="flex h-[4.25rem] shrink-0 items-center gap-3 border-b px-5">
			<div
				class="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
			>
				MO
			</div>
			<div class="min-w-0">
				<p class="truncate font-semibold">Monitoring</p>
				<p class="text-muted-foreground text-xs">Live operations</p>
			</div>
		</div>

		<nav class="flex-1 space-y-6 overflow-y-auto p-4">
			{#each navSections as section (section.title)}
				<div class="space-y-1">
					<p class="text-muted-foreground px-3 text-xs font-semibold tracking-wider uppercase">
						{section.title}
					</p>

					{#each section.items as item (item.href)}
						{@const active = page.url.pathname === `${base}${item.href}` || page.url.pathname === `${base}${item.href}/`}
						<a
							href="{base}{item.href}"
							class="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors {active
								? 'bg-primary text-primary-foreground font-medium'
								: 'hover:bg-accent hover:text-accent-foreground'}"
						>
							<span class="truncate">{item.label}</span>
							{#if !item.ready}
								<span class="bg-muted text-muted-foreground shrink-0 rounded-full px-1.5 text-[10px]">
									soon
								</span>
							{/if}
						</a>
					{/each}
				</div>
			{/each}
		</nav>
	</aside>

	<div class="flex min-w-0 flex-1 flex-col">
		<div
			class="bg-card/90 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3 backdrop-blur md:px-8"
		>
			<button
				type="button"
				aria-label="Toggle navigation"
				class="hover:bg-accent -ms-1 inline-flex size-8 shrink-0 items-center justify-center rounded-md md:hidden"
				onclick={() => (open = !open)}
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M3 6h18M3 12h18M3 18h18" />
				</svg>
			</button>

			<span class="text-sm font-medium">Overview</span>

			<!-- The shared segment. Everything to its left belongs to this app. -->
			<ToolbarActions
				{apps}
				{palettes}
				currentAppId="monitoring"
				user={{ name: 'Olivier Lambert', email: 'o.lambert@nixxis.com' }}
				class="ms-auto"
			/>
		</div>

		{@render children()}
	</div>
</div>
