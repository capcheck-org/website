<script>
	import { onMount } from 'svelte';

	let { fixed = true } = $props();

	const palette = [
		'--color-blue',
		'--color-indigo',
		'--color-purple',
		'--color-pink',
		'--color-red',
		'--color-orange',
		'--color-yellow',
		'--color-mint',
		'--color-teal',
		'--color-cyan'
	];

	let activeIndex = $state(0);
	let isHovered = $state(false);

	onMount(() => {
		const interval = setInterval(() => {
			activeIndex = (activeIndex + 1) % palette.length;
		}, 800);

		return () => clearInterval(interval);
	});

	let currentColor = $derived(`var(${palette[activeIndex]})`);
	let prevColor = $derived(`var(${palette[(activeIndex - 1 + palette.length) % palette.length]})`);
	let prevPrevColor = $derived(`var(${palette[(activeIndex - 2 + palette.length) % palette.length]})`);
</script>

<a
	href="https://capcheck.ai"
	target="_blank"
	rel="noopener noreferrer"
	class="app-badge"
	class:fixed
	class:hovered={isHovered}
	onmouseenter={() => isHovered = true}
	onmouseleave={() => isHovered = false}
>
	<div class="cap-prism" role="img" aria-label="CapCheck">
		<div class="cap-layer layer-back" style="background-color: {prevPrevColor};"></div>
		<div class="cap-layer layer-mid" style="background-color: {prevColor};"></div>
		<div class="cap-layer layer-front" style="background-color: {currentColor};"></div>
	</div>
	<span class="badge-label">
		<span class="label-text label-default">No cap?</span>
		<span class="label-text label-hover">Get the app</span>
	</span>
</a>

<style>
	.app-badge {
		display: flex;
		align-items: center;
		gap: 10px;
		background: var(--bg-primary);
		color: var(--text-primary);
		border: 1.5px solid var(--gray-4);
		padding: 10px 16px 10px 10px;
		border-radius: 100px;
		text-decoration: none;
		font-size: var(--text-sm);
		font-weight: 600;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
			border-color 0.25s ease;
	}

	/* Compact version for header (non-fixed) - 36px height */
	.app-badge:not(.fixed) {
		padding: 5px 12px 5px 6px;
		gap: 8px;
		font-size: var(--text-xs);
	}

	.app-badge:not(.fixed) .cap-prism {
		width: 22px;
		height: 22px;
	}

	.app-badge.fixed {
		position: fixed;
		top: 24px;
		right: 24px;
		z-index: 100;
	}

	.app-badge:hover {
		border-color: var(--brand-primary);
		box-shadow: 0 8px 24px rgba(0, 136, 255, 0.2);
	}

	/* Cap Prism - exact match from capcheck.ai Hero */
	.cap-prism {
		position: relative;
		width: 26px;
		height: 26px;
		flex-shrink: 0;
	}

	.cap-layer {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		-webkit-mask: url('/cap-icon-transparent.svg') no-repeat center;
		mask: url('/cap-icon-transparent.svg') no-repeat center;
		-webkit-mask-size: contain;
		mask-size: contain;
		transition: background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
			opacity 0.4s ease;
		will-change: transform, background-color;
	}

	.layer-front {
		z-index: 3;
		transform: scale(1);
	}

	.layer-mid {
		z-index: 2;
		opacity: 0.4;
		transform: scale(1.15);
		filter: blur(4px);
	}

	.layer-back {
		z-index: 1;
		opacity: 0.15;
		transform: scale(1.35);
		filter: blur(12px);
	}

	/* Hover state for prism */
	.app-badge:hover .layer-mid {
		transform: scale(1.2) rotate(-5deg);
		opacity: 0.6;
	}

	.app-badge:hover .layer-back {
		transform: scale(1.5) rotate(5deg);
		opacity: 0.3;
	}

	/* Label animation - natural width with smooth expand */
	.badge-label {
		display: flex;
		white-space: nowrap;
	}

	.label-text {
		overflow: hidden;
		transition: max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.label-default {
		max-width: 100px;
		opacity: 1;
	}

	.label-hover {
		max-width: 0;
		opacity: 0;
	}

	.app-badge.hovered .label-default {
		max-width: 0;
		opacity: 0;
	}

	.app-badge.hovered .label-hover {
		max-width: 100px;
		opacity: 1;
	}

	@media (max-width: 640px) {
		.app-badge.fixed {
			padding: 8px 14px 8px 8px;
			font-size: var(--text-xs);
			top: 16px;
			right: 16px;
		}

		.app-badge.fixed .cap-prism {
			width: 22px;
			height: 22px;
		}
	}
</style>
