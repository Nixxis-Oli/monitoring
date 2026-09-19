<script lang="ts">
	// A headline number is not a chart: no axes, no hover layer, nothing to
	// decode. The delta is spelled out in words beside the arrow, so the
	// direction never rests on colour alone.
	type Props = {
		label: string;
		value: string;
		delta?: number;
		/** Whether a rise is good news; escalation rate rising is not. */
		riseIsGood?: boolean;
	};

	let { label, value, delta, riseIsGood = true }: Props = $props();

	const good = $derived(delta === undefined ? null : delta >= 0 === riseIsGood);
</script>

<div class="bg-card space-y-1 rounded-xl border p-4">
	<p class="text-muted-foreground text-xs">{label}</p>
	<p class="text-2xl font-semibold tabular-nums">{value}</p>

	{#if delta !== undefined}
		<p class="flex items-center gap-1 text-xs {good ? 'text-[#0ca30c]' : 'text-[#d03b3b]'}">
			<span aria-hidden="true">{delta >= 0 ? '▲' : '▼'}</span>
			{Math.abs(delta).toFixed(1)}%
			<span class="text-muted-foreground">{delta >= 0 ? 'up' : 'down'} on last week</span>
		</p>
	{/if}
</div>
