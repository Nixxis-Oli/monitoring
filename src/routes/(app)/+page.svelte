<script lang="ts">
	import BarChart from '$lib/components/bar-chart.svelte';
	import DataTable from '$lib/components/data-table.svelte';
	import LineChart from '$lib/components/line-chart.svelte';
	import StatTile from '$lib/components/stat-tile.svelte';
	import { outcomes, totals, week } from '$lib/data';
	import { formatNumber, formatPercent } from '$lib/format';
</script>

<svelte:head><title>Overview - Monitoring</title></svelte:head>

<div class="space-y-6 p-4 md:p-8">
	<div>
		<h1 class="text-2xl font-semibold tracking-tight">Overview</h1>
		<p class="text-muted-foreground mt-1 text-sm">
			Invented figures. This application exists to prove two repositories can share one toolbar.
		</p>
	</div>

	<!-- Headline numbers first: four facts that need no decoding. -->
	<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<StatTile label="Conversations" value={formatNumber(totals.conversations)} delta={6.4} />
		<StatTile
			label="Escalation rate"
			value={formatPercent(totals.escalationRate)}
			delta={-1.2}
			riseIsGood={false}
		/>
		<StatTile label="Median response" value="{totals.medianResponse}s" delta={-0.8} riseIsGood={false} />
		<StatTile label="Satisfaction" value={formatPercent(totals.satisfaction)} delta={2.1} />
	</div>

	<div class="grid gap-6 lg:grid-cols-3">
		<div class="bg-card min-w-0 space-y-4 rounded-xl border p-5 lg:col-span-2">
			<LineChart data={week} />
			<DataTable data={week} />
		</div>

		<div class="bg-card min-w-0 rounded-xl border p-5">
			<BarChart data={outcomes} />
		</div>
	</div>
</div>
