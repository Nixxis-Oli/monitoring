<script lang="ts">
	import { formatNumber } from '$lib/format';
	import type { DayPoint } from '$lib/data';

	// The table view the palette's contrast warning obliges, and the fallback for
	// anyone the charts do not serve.
	type Props = { data: DayPoint[] };

	let { data }: Props = $props();
	let open = $state(false);
</script>

<div class="space-y-3">
	<button
		type="button"
		onclick={() => (open = !open)}
		class="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4 transition-colors"
	>
		{open ? 'Hide' : 'Show'} the figures as a table
	</button>

	{#if open}
		<table class="w-full text-sm">
			<caption class="sr-only">Conversations handled and escalated, per day</caption>
			<thead>
				<tr class="text-muted-foreground border-b text-xs">
					<th scope="col" class="py-2 text-left font-medium">Day</th>
					<th scope="col" class="py-2 text-right font-medium">Handled</th>
					<th scope="col" class="py-2 text-right font-medium">Escalated</th>
				</tr>
			</thead>
			<tbody>
				{#each data as point (point.day)}
					<tr class="border-b last:border-0">
						<th scope="row" class="py-2 text-left font-normal">{point.day}</th>
						<td class="py-2 text-right tabular-nums">{formatNumber(point.handled)}</td>
						<td class="py-2 text-right tabular-nums">{formatNumber(point.escalated)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
