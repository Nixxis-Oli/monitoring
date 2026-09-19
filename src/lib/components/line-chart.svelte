<script lang="ts">
	import { formatNumber } from '$lib/format';
	import type { DayPoint } from '$lib/data';

	// Two series over a week: the job is change over time, so a line. Colours are
	// categorical slots 1 and 2 in their fixed order, taken from app.css - a
	// series never picks up the interface palette, because its colour encodes
	// data rather than taste.
	type Props = { data: DayPoint[] };

	let { data }: Props = $props();

	const SERIES = [
		{ key: 'handled' as const, label: 'Handled', color: 'var(--series-1)' },
		{ key: 'escalated' as const, label: 'Escalated', color: 'var(--series-2)' }
	];

	const PAD = { top: 16, right: 56, bottom: 28, left: 44 };
	const HEIGHT = 240;

	let width = $state(720);
	let hovered = $state<number | null>(null);

	const max = $derived(Math.max(...data.map((d) => Math.max(d.handled, d.escalated))) * 1.1);
	const plotWidth = $derived(Math.max(120, width - PAD.left - PAD.right));
	const plotHeight = HEIGHT - PAD.top - PAD.bottom;

	const x = (index: number) =>
		PAD.left + (data.length === 1 ? plotWidth / 2 : (index / (data.length - 1)) * plotWidth);
	const y = (value: number) => PAD.top + plotHeight - (value / max) * plotHeight;

	function path(key: 'handled' | 'escalated'): string {
		return data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(d[key])}`).join(' ');
	}

	// Four recessive gridlines are enough to read a value against.
	const ticks = $derived(
		Array.from({ length: 4 }, (_, i) => Math.round((max / 4) * (i + 1) / 10) * 10)
	);

	function track(event: MouseEvent) {
		const bounds = (event.currentTarget as SVGRectElement).getBoundingClientRect();
		const ratio = (event.clientX - bounds.left) / bounds.width;

		hovered = Math.min(data.length - 1, Math.max(0, Math.round(ratio * (data.length - 1))));
	}
</script>

<figure class="space-y-3">
	<figcaption class="flex flex-wrap items-baseline justify-between gap-3">
		<h3 class="text-sm font-semibold">Conversations this week</h3>

		<!-- A legend is always present from two series up; the end-of-line labels
			 below repeat it, so identity never rests on colour alone. -->
		<ul class="flex gap-4">
			{#each SERIES as series (series.key)}
				<li class="text-muted-foreground flex items-center gap-1.5 text-xs">
					<span class="size-2 rounded-full" style:background-color={series.color}></span>
					{series.label}
				</li>
			{/each}
		</ul>
	</figcaption>

	<div class="relative" bind:clientWidth={width}>
		<svg {width} height={HEIGHT} role="img" aria-label="Conversations handled and escalated per day">
			{#each ticks as tick (tick)}
				<line
					x1={PAD.left}
					x2={PAD.left + plotWidth}
					y1={y(tick)}
					y2={y(tick)}
					stroke="var(--chart-grid)"
					stroke-width="1"
				/>
				<text x={PAD.left - 8} y={y(tick) + 4} text-anchor="end" class="fill-muted-foreground text-[10px]">
					{formatNumber(tick)}
				</text>
			{/each}

			{#each data as point, index (point.day)}
				<text
					x={x(index)}
					y={HEIGHT - 8}
					text-anchor="middle"
					class="fill-muted-foreground text-[10px]"
				>
					{point.day}
				</text>
			{/each}

			{#if hovered !== null}
				<line
					x1={x(hovered)}
					x2={x(hovered)}
					y1={PAD.top}
					y2={PAD.top + plotHeight}
					stroke="var(--chart-grid)"
					stroke-width="1"
				/>
			{/if}

			{#each SERIES as series (series.key)}
				<path d={path(series.key)} fill="none" stroke={series.color} stroke-width="2" stroke-linejoin="round" />

				<!-- Direct label at the end of each line: the second identity channel,
					 and the contrast relief the light-mode palette requires. -->
				<text
					x={x(data.length - 1) + 8}
					y={y(data[data.length - 1][series.key]) + 4}
					class="text-[10px] font-medium"
					fill={series.color}
				>
					{series.label}
				</text>

				{#if hovered !== null}
					<circle
						cx={x(hovered)}
						cy={y(data[hovered][series.key])}
						r="4.5"
						fill={series.color}
						stroke="var(--color-card)"
						stroke-width="2"
					/>
				{/if}
			{/each}

			<!-- One overlay rather than per-point hit areas: the target is the whole
				 column, which is far easier to hit than a 4px dot. -->
			<rect
				x={PAD.left}
				y={PAD.top}
				width={plotWidth}
				height={plotHeight}
				fill="transparent"
				onmousemove={track}
				onmouseleave={() => (hovered = null)}
				role="presentation"
			/>
		</svg>

		{#if hovered !== null}
			<div
				class="bg-popover text-popover-foreground pointer-events-none absolute top-2 rounded-md border px-2.5 py-1.5 text-xs shadow-md"
				style:left="{Math.min(width - 150, Math.max(0, x(hovered) - 60))}px"
			>
				<p class="font-medium">{data[hovered].day}</p>
				{#each SERIES as series (series.key)}
					<p class="text-muted-foreground flex items-center gap-1.5">
						<span class="size-2 rounded-full" style:background-color={series.color}></span>
						{series.label}
						<span class="text-foreground ms-auto font-medium">
							{formatNumber(data[hovered][series.key])}
						</span>
					</p>
				{/each}
			</div>
		{/if}
	</div>
</figure>
