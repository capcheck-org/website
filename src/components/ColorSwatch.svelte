<script>
	let { name, value, description = '' } = $props();

	function copyToClipboard() {
		navigator.clipboard.writeText(value);
	}
</script>

<button class="swatch" onclick={copyToClipboard} title="Click to copy {value}">
	<div class="color-preview" style="background-color: {value}"></div>
	<div class="info">
		<span class="name">{name}</span>
		<span class="value">{value}</span>
		{#if description}
			<span class="description">{description}</span>
		{/if}
	</div>
</button>

<style>
	.swatch {
		display: flex;
		flex-direction: column;
		background: var(--bg-primary);
		border: 1px solid var(--gray-4);
		border-radius: 12px;
		overflow: hidden;
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		text-align: left;
		font-family: inherit;
	}

	.swatch:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.color-preview {
		height: 80px;
		width: 100%;
	}

	.info {
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.name {
		font-weight: 600;
		font-size: var(--text-sm);
		color: var(--text-primary);
	}

	.value {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-secondary);
		text-transform: uppercase;
	}

	.description {
		font-size: var(--text-xs);
		color: var(--text-secondary);
		margin-top: 4px;
	}
</style>
