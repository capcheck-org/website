<script>
	// Props
	let { claVersion = '1.0', claText = '' } = $props();

	// Form state
	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let streetAddress = $state('');
	let addressLine2 = $state('');
	let city = $state('');
	let stateProvince = $state('');
	let postalCode = $state('');
	let country = $state('');
	let phone = $state('');
	let electronicSignature = $state('');

	// UI state
	let isSubmitting = $state(false);
	let submitError = $state('');
	let submitSuccess = $state(false);
	let alreadySigned = $state(null);

	// Validation
	let touched = $state({
		firstName: false,
		lastName: false,
		email: false,
		streetAddress: false,
		city: false,
		stateProvince: false,
		postalCode: false,
		country: false,
		phone: false,
		electronicSignature: false,
	});

	let errors = $derived({
		firstName: !firstName.trim() ? 'First name is required' : '',
		lastName: !lastName.trim() ? 'Last name is required' : '',
		email: !email.trim() ? 'Email is required' : !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? 'Invalid email format' : '',
		streetAddress: !streetAddress.trim() ? 'Street address is required' : '',
		city: !city.trim() ? 'City is required' : '',
		stateProvince: !stateProvince.trim() ? 'State/Province is required' : '',
		postalCode: !postalCode.trim() ? 'Postal code is required' : '',
		country: !country ? 'Country is required' : '',
		phone: !phone.trim() ? 'Phone is required' : '',
		electronicSignature: electronicSignature.toUpperCase() !== 'I AGREE' ? 'You must type "I AGREE" to accept' : '',
	});

	let isValid = $derived(
		Object.values(errors).every(e => e === '') &&
		firstName && lastName && email && streetAddress && city && stateProvince && postalCode && country && phone && electronicSignature
	);

	// Country list
	const countries = [
		'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France',
		'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands',
		'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria', 'Belgium',
		'Ireland', 'New Zealand', 'Singapore', 'South Korea', 'Taiwan', 'Hong Kong',
		'Israel', 'Poland', 'Czech Republic', 'Portugal', 'Greece', 'Argentina',
		'Chile', 'Colombia', 'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'UAE',
		'Saudi Arabia', 'Turkey', 'Russia', 'Ukraine', 'Romania', 'Hungary',
		'Philippines', 'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Other'
	].sort();

	async function checkExisting() {
		if (!email || errors.email) return;

		try {
			const response = await fetch(`/api/cla-submissions?filters[email]=${encodeURIComponent(email)}`);
			const data = await response.json();

			if (data.data && data.data.length > 0) {
				alreadySigned = data.data[0].signedAt;
			} else {
				alreadySigned = null;
			}
		} catch (err) {
			// Silently fail - will be caught on submit
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if (!isValid || isSubmitting) return;

		// Check for existing submission first
		await checkExisting();
		if (alreadySigned) return;

		isSubmitting = true;
		submitError = '';

		try {
			const response = await fetch('/api/cla-submissions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					data: {
						firstName: firstName.trim(),
						lastName: lastName.trim(),
						email: email.trim().toLowerCase(),
						streetAddress: streetAddress.trim(),
						addressLine2: addressLine2.trim() || null,
						city: city.trim(),
						stateProvince: stateProvince.trim(),
						postalCode: postalCode.trim(),
						country,
						phone: phone.trim(),
						electronicSignature: electronicSignature.toUpperCase(),
						signedAt: new Date().toISOString(),
						claVersion,
					}
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error?.message || 'Failed to submit CLA');
			}

			submitSuccess = true;
		} catch (err) {
			submitError = err.message || 'An error occurred while submitting. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	function markTouched(field) {
		touched[field] = true;
	}
</script>

{#if submitSuccess}
	<div class="success-message">
		<h2>Thank you for signing the CLA!</h2>
		<p>Your signature has been recorded. You can now contribute to CapCheck projects.</p>
		<p class="signature-details">
			Signed by: {firstName} {lastName}<br>
			Email: {email}
		</p>
	</div>
{:else if alreadySigned}
	<div class="already-signed">
		<h2>You've already signed the CLA</h2>
		<p>Our records show that you signed the Contributor License Agreement on {new Date(alreadySigned).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.</p>
		<p>You're all set to contribute to CapCheck projects!</p>
	</div>
{:else}
	{#if claText}
		<section class="cla-text">
			{@html claText}
		</section>
	{/if}

	<form onsubmit={handleSubmit} class="cla-form">
		<h2>Sign Electronically</h2>

		<div class="form-group">
			<label for="firstName">Full Name</label>
			<div class="form-row">
				<input
					type="text"
					id="firstName"
					bind:value={firstName}
					onblur={() => markTouched('firstName')}
					placeholder="First Name"
					autocomplete="given-name"
					class:error={touched.firstName && errors.firstName}
				/>
				<input
					type="text"
					id="lastName"
					bind:value={lastName}
					onblur={() => markTouched('lastName')}
					placeholder="Last Name"
					autocomplete="family-name"
					class:error={touched.lastName && errors.lastName}
				/>
			</div>
			{#if (touched.firstName && errors.firstName) || (touched.lastName && errors.lastName)}
				<span class="error-text">{errors.firstName || errors.lastName}</span>
			{/if}
		</div>

		<div class="form-group">
			<label for="email">Email</label>
			<input
				type="email"
				id="email"
				bind:value={email}
				onblur={() => { markTouched('email'); checkExisting(); }}
				autocomplete="email"
				class:error={touched.email && errors.email}
			/>
			{#if touched.email && errors.email}
				<span class="error-text">{errors.email}</span>
			{/if}
		</div>

		<div class="form-group">
			<label for="streetAddress">Mailing Address</label>
			<input
				type="text"
				id="streetAddress"
				bind:value={streetAddress}
				onblur={() => markTouched('streetAddress')}
				placeholder="Street address"
				autocomplete="address-line1"
				class:error={touched.streetAddress && errors.streetAddress}
			/>
			<input
				type="text"
				id="addressLine2"
				bind:value={addressLine2}
				placeholder="Address line 2"
				autocomplete="address-line2"
				class="mt-small"
			/>
			<div class="form-row mt-small">
				<input
					type="text"
					id="city"
					bind:value={city}
					onblur={() => markTouched('city')}
					placeholder="City"
					autocomplete="address-level2"
					class:error={touched.city && errors.city}
				/>
				<input
					type="text"
					id="stateProvince"
					bind:value={stateProvince}
					onblur={() => markTouched('stateProvince')}
					placeholder="State / Province / Region"
					autocomplete="address-level1"
					class:error={touched.stateProvince && errors.stateProvince}
				/>
			</div>
			<div class="form-row mt-small">
				<input
					type="text"
					id="postalCode"
					bind:value={postalCode}
					onblur={() => markTouched('postalCode')}
					placeholder="Postal / Zip Code"
					autocomplete="postal-code"
					class:error={touched.postalCode && errors.postalCode}
				/>
				<select
					id="country"
					bind:value={country}
					onblur={() => markTouched('country')}
					autocomplete="country-name"
					class:error={touched.country && errors.country}
				>
					<option value=""></option>
					{#each countries as c (c)}
						<option value={c}>{c}</option>
					{/each}
				</select>
			</div>
			{#if (touched.streetAddress && errors.streetAddress) || (touched.city && errors.city) || (touched.stateProvince && errors.stateProvince) || (touched.postalCode && errors.postalCode) || (touched.country && errors.country)}
				<span class="error-text">{errors.streetAddress || errors.city || errors.stateProvince || errors.postalCode || errors.country}</span>
			{/if}
		</div>

		<div class="form-group">
			<label for="phone">Phone</label>
			<input
				type="tel"
				id="phone"
				bind:value={phone}
				onblur={() => markTouched('phone')}
				autocomplete="tel"
				class:error={touched.phone && errors.phone}
			/>
			{#if touched.phone && errors.phone}
				<span class="error-text">{errors.phone}</span>
			{/if}
		</div>

		<div class="form-group signature-group">
			<label for="electronicSignature">Electronic Signature</label>
			<p class="signature-instruction">Type "I AGREE" to accept the terms above</p>
			<input
				type="text"
				id="electronicSignature"
				bind:value={electronicSignature}
				onblur={() => markTouched('electronicSignature')}
				placeholder="I AGREE"
				class="signature-input"
				class:error={touched.electronicSignature && errors.electronicSignature}
			/>
			{#if touched.electronicSignature && errors.electronicSignature}
				<span class="error-text">{errors.electronicSignature}</span>
			{/if}
		</div>

		{#if submitError}
			<div class="submit-error">{submitError}</div>
		{/if}

		<button type="submit" disabled={!isValid || isSubmitting} class="submit-button">
			{isSubmitting ? 'Submitting...' : 'Submit'}
		</button>
	</form>
{/if}

<style>
	.cla-text {
		background: var(--bg-secondary);
		padding: 2rem;
		border-radius: 12px;
		margin-bottom: 2rem;
		max-height: 500px;
		overflow-y: auto;
		border: 1px solid var(--gray-4);
	}

	.cla-text :global(h2) {
		font-size: var(--text-2xl);
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.cla-text :global(h2:first-child) {
		margin-top: 0;
	}

	.cla-text :global(h3) {
		font-size: var(--text-xl);
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		color: var(--text-primary);
	}

	.cla-text :global(p) {
		font-size: var(--text-base);
		line-height: 1.7;
		margin-bottom: 1rem;
		color: var(--text-secondary);
	}

	.cla-text :global(p strong) {
		color: var(--text-primary);
	}

	.cla-form {
		background: var(--bg-primary);
		padding: 0;
		max-width: 100%;
	}

	h2 {
		font-size: var(--text-2xl);
		font-weight: 700;
		margin-top: 0.5rem;
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		margin-bottom: 1.25rem;
	}

	.mt-small {
		margin-top: 0.75rem;
	}

	label {
		display: block;
		font-weight: 600;
		margin-bottom: 0.5rem;
		color: var(--text-primary);
		font-size: var(--text-sm);
	}

	input, select {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid var(--gray-4);
		border-radius: 6px;
		font-size: var(--text-base);
		font-family: var(--font-system);
		background: var(--bg-primary);
		color: var(--text-primary);
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	input::placeholder {
		color: var(--gray-2);
	}

	select {
		cursor: pointer;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23838388' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 1rem center;
		padding-right: 2.5rem;
	}

	input:focus, select:focus {
		outline: none;
		border-color: var(--brand-primary);
		box-shadow: 0 0 0 3px rgba(0, 136, 255, 0.15);
	}

	input.error, select.error {
		border-color: var(--color-error);
	}

	input.error:focus, select.error:focus {
		box-shadow: 0 0 0 3px rgba(255, 57, 60, 0.15);
	}

	.error-text {
		display: block;
		color: var(--color-error);
		font-size: var(--text-sm);
		margin-top: 0.5rem;
	}

	.signature-group {
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--gray-5);
	}

	.signature-instruction {
		color: var(--text-secondary);
		font-size: var(--text-sm);
		margin-bottom: 0.5rem;
		margin-top: -0.25rem;
	}

	.signature-input {
		font-size: var(--text-base);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.submit-error {
		background: rgba(255, 57, 60, 0.1);
		color: var(--color-error);
		padding: 1rem;
		border-radius: 6px;
		margin-bottom: 1rem;
		font-size: var(--text-sm);
	}

	.submit-button {
		display: inline-block;
		padding: 0.875rem 2rem;
		background: var(--brand-primary);
		color: white;
		border: none;
		border-radius: 6px;
		font-size: var(--text-base);
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease, opacity 0.2s ease;
	}

	.submit-button:hover:not(:disabled) {
		background: var(--brand-primary-dark);
	}

	.submit-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.success-message, .already-signed {
		padding: 2rem;
		border-radius: 12px;
		text-align: center;
	}

	.success-message {
		background: rgba(53, 199, 89, 0.1);
		border: 1px solid var(--color-success);
	}

	.success-message h2 {
		color: var(--color-success);
	}

	.already-signed {
		background: rgba(0, 136, 255, 0.1);
		border: 1px solid var(--brand-primary);
	}

	.already-signed h2 {
		color: var(--brand-primary);
	}

	.signature-details {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--gray-5);
		font-size: var(--text-sm);
		color: var(--text-secondary);
		line-height: 1.6;
	}

	@media (max-width: 640px) {
		.cla-text {
			padding: 1.5rem;
			max-height: 400px;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
