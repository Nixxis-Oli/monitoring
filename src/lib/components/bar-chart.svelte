<script lang="ts">
	import { formatNumber } from '$lib/format';
	import type { Outcome } from '$lib/data';

	// One measure across three categories, so one hue: the labels already carry
	// identity and a second colour would encode nothing. Horizontal, because the
	// values differ by an order of magnitude and the labels read better inline.
	type Props = { data: Outcome[] };

	let { data }: Props = $props();

	let hovered = $state<string | null>(null);

	const max = $derived(Math.max(...data.map((d) => d.value)));
	const total = $derived(data.reduce((sum, d) => sum + d.value, 0));
</script>

<figure class="space-y-3">
	<figcaption>
		<h3 class="text-sm font-semibold">Outcomes</h3>
		<p class="text-muted-foreground text-xs">{formatNumber(total)} conversations this week</p>
	</figcaption>

	<ul class="space-y-3">
		{#each data as item (item.label)}
			<li
				class="space-y-1"
				onmouseenter={() => (hovered = item.label)}
				onmouseleave={() => (hovered = null)}
				role="presentation"
			>
				<div class="flex items-baseline justify-between gap-3 text-xs">
					<span>{item.label}</span>
					<!-- Value shown outright rather than on hover only: the light-mode
						 palette needs the relief, and a reader should not have to point
						 at a bar to learn what it is worth. -->
					<span class="text-muted-foreground tabular-nums">
						{formatNumber(item.value)}
						<span class="ms-1">({Math.round((item.value / total) * 100)}%)</span>
					</span>
				</div>

				<div class="bg-muted h-2 w-full overflow-hidden rounded-full">
					<div
						class="h-full rounded-full transition-[width,opacity] duration-200"
						style:width="{Math.max(2, (item.value / max) * 100)}%"
						style:background-color="var(--series-1)"
						style:opacity={hovered && hovered !== item.label ? 0.45 : 1}
					></div>
				</div>
			</li>
		{/each}
	</ul>
</figure>
