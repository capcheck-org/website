<script>
  import ColorSwatch from './ColorSwatch.svelte';

  const brandColors = [
    { name: 'Primary', value: '#0088FF', description: 'Main brand color' },
    { name: 'Primary Light', value: '#0091FF', description: 'Hover states' },
    { name: 'Primary Dark', value: '#1E6EF4', description: 'Active states' },
    { name: 'Primary Tint', value: '#5DB8FF', description: 'Backgrounds' }
  ];

  const semanticColors = [
    { name: 'Success', value: '#35C759', description: 'Verified / True claims' },
    { name: 'Success Light', value: '#31D158' },
    { name: 'Success Dark', value: '#008932' },
    { name: 'Success Tint', value: '#49D968' },
    { name: 'Error', value: '#FF393C', description: 'False / Disputed claims' },
    { name: 'Error Light', value: '#FF4246' },
    { name: 'Error Dark', value: '#E9152D' },
    { name: 'Error Tint', value: '#FF6165' },
    { name: 'Warning', value: '#FFCC02', description: 'Needs review' },
    { name: 'Warning Light', value: '#FED700' },
    { name: 'Warning Dark', value: '#A16A01' },
    { name: 'Warning Tint', value: '#FEDF43' }
  ];

  const grayscale = [
    { name: 'Gray 1', value: '#838388' },
    { name: 'Gray 2', value: '#A4A5A9' },
    { name: 'Gray 3', value: '#BFC0C5' },
    { name: 'Gray 4', value: '#CBCBD0' },
    { name: 'Gray 5', value: '#E1E1E7' },
    { name: 'Gray 6', value: '#F0F0F6' }
  ];

  const extendedPalette = [
    { name: 'Red', value: '#FF393C' },
    { name: 'Orange', value: '#FF8D28' },
    { name: 'Yellow', value: '#FFCC02' },
    { name: 'Green', value: '#35C759' },
    { name: 'Mint', value: '#00C8B3' },
    { name: 'Teal', value: '#03C3D1' },
    { name: 'Cyan', value: '#00C0E8' },
    { name: 'Blue', value: '#0088FF' },
    { name: 'Indigo', value: '#6155F5' },
    { name: 'Purple', value: '#CB30E0' },
    { name: 'Pink', value: '#FF2C55' },
    { name: 'Brown', value: '#AC7F5E' }
  ];
</script>

{#snippet colorSection(title, colors)}
  <section class="color-section">
    <h2>{title}</h2>
    <div class="color-grid">
      {#each colors as color (color.name)}
        <ColorSwatch {...color} />
      {/each}
    </div>
  </section>
{/snippet}

<div class="brand-page">
  <!-- Header -->
  <header class="page-header">
    <p class="subtitle">Brand Style Guide</p>
    <p class="tagline">"No cap, just facts"</p>
  </header>

  <!-- Brand Overview -->
  <section class="brand-overview">
    <h2>Brand Identity</h2>
    <p>
      CapCheck brings instant truth verification to everyday content consumption through a sophisticated
      visual identity that merges the baseball cap symbol with verification technology. The minimalist
      design features a clean, recognizable cap icon that reads as both casual/approachable and trustworthy,
      representing the intersection of internet culture ("no cap" = no lies) and AI-powered fact-checking.
    </p>
  </section>

  <!-- Color Sections -->
  {@render colorSection("Brand Colors", brandColors)}
  {@render colorSection("Semantic Colors", semanticColors)}
  {@render colorSection("Grayscale", grayscale)}
  {@render colorSection("Extended Palette", extendedPalette)}

  <!-- Logos Section -->
  <section class="logos-section">
    <h2>Logos & Brand Marks</h2>

    <!-- Full Logo -->
    <div class="logo-group">
      <h3>Full Logo</h3>
      <div class="logo-variants">
        <!-- Full Logo - Light Mode -->
        <div class="logo-variant">
          <div class="logo-preview light">
            <img
              src="/logo-full-transparent.svg"
              alt="Full logo light mode"
              class="logo-img brand-filter"
            />
          </div>
          <p class="variant-name">Light Mode</p>
          <p class="variant-file">logo-full-transparent.svg</p>
        </div>

        <!-- Full Logo - Dark Mode -->
        <div class="logo-variant">
          <div class="logo-preview dark">
            <img
              src="/logo-full-transparent.svg"
              alt="Full logo dark mode"
              class="logo-img brand-filter"
            />
          </div>
          <p class="variant-name">Dark Mode</p>
          <p class="variant-file">logo-full-transparent.svg</p>
        </div>

        <!-- Full Logo - Brand Background -->
        <div class="logo-variant">
          <div class="logo-preview brand">
            <img
              src="/logo-full-transparent.svg"
              alt="Full logo brand background"
              class="logo-img white-filter"
            />
          </div>
          <p class="variant-name">Brand Background</p>
          <p class="variant-file">logo-full-transparent.svg</p>
        </div>
      </div>
    </div>

    <!-- Logo Variants - SVG -->
    <div class="logo-group">
      <h3>Cap Icon Only</h3>
      <div class="logo-variants icon-variants">
        <!-- Transparent - Light Mode -->
        <div class="logo-variant">
          <div class="logo-preview light icon-preview">
            <img
              src="/cap-icon-transparent.svg"
              alt="Light mode"
              class="icon-img brand-filter"
            />
          </div>
          <p class="variant-name">Light Mode</p>
          <p class="variant-file">cap-icon-transparent.svg</p>
        </div>

        <!-- Transparent - Dark Mode -->
        <div class="logo-variant">
          <div class="logo-preview dark icon-preview">
            <img
              src="/cap-icon-transparent.svg"
              alt="Dark mode"
              class="icon-img brand-filter"
            />
          </div>
          <p class="variant-name">Dark Mode</p>
          <p class="variant-file">cap-icon-transparent.svg</p>
        </div>

        <!-- Transparent - Brand Color -->
        <div class="logo-variant">
          <div class="logo-preview brand icon-preview">
            <img
              src="/cap-icon-transparent.svg"
              alt="Brand background"
              class="icon-img white-filter"
            />
          </div>
          <p class="variant-name">Brand Background</p>
          <p class="variant-file">cap-icon-transparent.svg</p>
        </div>
      </div>
    </div>

    <!-- App Icons - iOS -->
    <div class="logo-group">
      <h3>iOS App Icons</h3>
      <div class="app-icons-grid">
        <div class="app-icon-variant">
          <img src="/CapCheck-iOS-Default-1024x1024@1x.png" alt="iOS Default" class="app-icon" />
          <p class="variant-name">Default</p>
        </div>

        <div class="app-icon-variant">
          <img src="/CapCheck-iOS-Dark-1024x1024@1x.png" alt="iOS Dark" class="app-icon" />
          <p class="variant-name">Dark</p>
        </div>

        <div class="app-icon-variant">
          <img src="/CapCheck-iOS-TintedLight-1024x1024@1x.png" alt="iOS Tinted Light" class="app-icon" />
          <p class="variant-name">Tinted Light</p>
        </div>

        <div class="app-icon-variant">
          <img src="/CapCheck-iOS-TintedDark-1024x1024@1x.png" alt="iOS Tinted Dark" class="app-icon" />
          <p class="variant-name">Tinted Dark</p>
        </div>

        <div class="app-icon-variant">
          <img src="/CapCheck-iOS-ClearLight-1024x1024@1x.png" alt="iOS Clear Light" class="app-icon" />
          <p class="variant-name">Clear Light</p>
        </div>

        <div class="app-icon-variant">
          <img src="/CapCheck-iOS-ClearDark-1024x1024@1x.png" alt="iOS Clear Dark" class="app-icon" />
          <p class="variant-name">Clear Dark</p>
        </div>
      </div>
    </div>

    <!-- App Icons - watchOS -->
    <div class="logo-group">
      <h3>watchOS App Icon</h3>
      <div class="app-icons-grid">
        <div class="app-icon-variant">
          <img src="/CapCheck-watchOS-Default-1088x1088@1x.png" alt="watchOS Default" class="app-icon watch-icon" />
          <p class="variant-name">Default</p>
        </div>
      </div>
    </div>

    <!-- Usage Guidelines -->
    <div class="usage-guidelines">
      <h3>Usage Guidelines</h3>
      <div class="guidelines-content">
        <p class="guideline-title">Primary Logo (Recommended):</p>
        <ul>
          <li>File: <code>logo-full-transparent.svg</code></li>
          <li>Use for all primary branding - maintains perfect proportions</li>
          <li>Use CSS filters to change color based on theme</li>
          <li>Light mode: Apply brand blue filter (#0088FF)</li>
          <li>Dark mode: Apply white filter (#FFFFFF)</li>
        </ul>

        <p class="guideline-title">Cap Icon Only:</p>
        <ul>
          <li>File: <code>cap-icon-transparent.svg</code></li>
          <li>Use for app icons, favicons, or when space is limited</li>
          <li>512x512 square frame with the cap centered</li>
        </ul>

        <p class="guideline-title">General Guidelines:</p>
        <ul>
          <li>Always use <code>logo-full-transparent.svg</code> for primary branding</li>
          <li>Maintain minimum clear space around logo</li>
          <li>Do not stretch, distort, or modify the logo</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Typography -->
  <section class="typography-section">
    <h2>Typography</h2>

    <!-- System Font -->
    <div class="font-showcase system-font">
      <div class="font-header">
        <h3>System Font Stack</h3>
        <span class="font-badge">Primary</span>
      </div>

      <div class="font-samples">
        <div class="font-sample">
          <p class="sample-text hero">Instant Truth Verification</p>
          <p class="sample-meta">60px / Bold</p>
        </div>

        <div class="font-sample">
          <p class="sample-text heading">Verify claims in real-time</p>
          <p class="sample-meta">36px / Semibold</p>
        </div>

        <div class="font-sample">
          <p class="sample-text subheading">The quick brown fox jumps over the lazy dog</p>
          <p class="sample-meta">24px / Regular</p>
        </div>

        <div class="font-sample">
          <p class="sample-text body">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            0123456789 !@#$%^&*()
          </p>
          <p class="sample-meta">16px / Regular</p>
        </div>
      </div>

      <div class="font-usage">
        <strong>Usage:</strong> Primary font for all UI text, headings, body copy, and interface elements.
      </div>
    </div>

    <!-- Display Font -->
    <div class="font-showcase display-font">
      <div class="font-header">
        <h3>System Serif</h3>
        <span class="font-badge">Display</span>
      </div>

      <div class="font-samples serif">
        <div class="font-sample">
          <p class="sample-text display-hero">Instant Truth Verification</p>
          <p class="sample-meta">60px / Bold</p>
        </div>

        <div class="font-sample">
          <p class="sample-text display-heading">Verify claims in real-time</p>
          <p class="sample-meta">36px / Semibold</p>
        </div>

        <div class="font-sample">
          <p class="sample-text display-subheading">The quick brown fox jumps over the lazy dog</p>
          <p class="sample-meta">24px / Regular</p>
        </div>

        <div class="font-sample">
          <p class="sample-text display-body">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
            abcdefghijklmnopqrstuvwxyz<br />
            0123456789 !@#$%^&*()
          </p>
          <p class="sample-meta">16px / Regular</p>
        </div>
      </div>

      <div class="font-usage">
        <strong>Usage:</strong> Used for special decorative headers and display text where a serif style is preferred.
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="brand-footer">
    <p>CapCheck Brand System - Shared across all surfaces (Apple, Android, Web, etc.)</p>
  </footer>
</div>

<style>
  .brand-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 32px 100px 32px;
    position: relative;
  }

  @media (min-width: 1200px) {
    .brand-page {
      padding: 40px 0 100px 0;
    }
  }

  /* Header */
  .page-header {
    margin-bottom: 64px;
    text-align: center;
  }

  .subtitle {
    font-size: var(--text-xl);
    color: var(--text-secondary);
    animation: fadeIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    opacity: 0;
  }

  .tagline {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    margin-top: 8px;
    animation: fadeIn 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    opacity: 0;
  }

  /* Brand Overview */
  .brand-overview {
    margin-bottom: 64px;
    padding: 32px;
    background-color: var(--gray-6);
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.04);
  }

  .brand-overview h2 {
    font-size: var(--text-3xl);
    margin-bottom: 16px;
    font-weight: 600;
  }

  .brand-overview p {
    font-size: var(--text-base);
    line-height: 1.6;
    color: var(--text-secondary);
  }

  /* Color Sections */
  .color-section {
    margin-bottom: 48px;
  }

  .color-section h2 {
    font-size: var(--text-3xl);
    margin-bottom: 24px;
    font-weight: 600;
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }

  /* Logos Section */
  .logos-section h2 {
    font-size: var(--text-3xl);
    margin-bottom: 24px;
    font-weight: 600;
  }

  .logo-group {
    margin-bottom: 48px;
  }

  .logo-group h3 {
    font-size: var(--text-xl);
    margin-bottom: 16px;
    font-weight: 600;
  }

  .logo-variants {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .icon-variants {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .logo-variant {
    text-align: left;
  }

  .logo-preview {
    padding: 32px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  .logo-preview.light {
    background-color: #ffffff;
    border: 1px solid var(--gray-4);
  }

  .logo-preview.dark {
    background-color: #000000;
  }

  .logo-preview.brand {
    background-color: var(--brand-primary);
  }

  .logo-img {
    width: 250px;
    height: auto;
  }

  .icon-preview {
    padding: 32px;
  }

  .icon-img {
    width: 100px;
    height: 100px;
  }

  .brand-filter {
    filter: brightness(0) saturate(100%) invert(41%) sepia(96%) saturate(1815%) hue-rotate(196deg) brightness(102%) contrast(101%);
  }

  .white-filter {
    filter: brightness(0) saturate(100%) invert(100%);
  }

  .variant-name {
    font-size: var(--text-sm);
    font-weight: 600;
  }

  .variant-file {
    font-size: var(--text-xs);
    color: var(--text-secondary);
  }

  /* App Icons */
  .app-icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 20px;
  }

  .app-icon-variant {
    text-align: center;
  }

  .app-icon {
    width: 80px;
    height: 80px;
    border-radius: 18px;
    margin-bottom: 8px;
  }

  .watch-icon {
    border-radius: 50%;
  }

  /* Usage Guidelines */
  .usage-guidelines {
    background-color: var(--gray-6);
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--gray-4);
    margin-bottom: 48px;
  }

  .usage-guidelines h3 {
    font-size: var(--text-lg);
    margin-bottom: 12px;
    font-weight: 600;
  }

  .guidelines-content {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .guideline-title {
    margin-bottom: 12px;
    font-weight: 600;
  }

  .guidelines-content ul {
    padding-left: 20px;
    margin-bottom: 16px;
  }

  .guidelines-content code {
    background-color: var(--gray-5);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: var(--text-xs);
  }

  /* Typography Section */
  .typography-section {
    margin-bottom: 48px;
  }

  .typography-section h2 {
    font-size: var(--text-3xl);
    margin-bottom: 24px;
    font-weight: 600;
  }

  .font-showcase {
    padding: 32px;
    border-radius: 12px;
    margin-bottom: 24px;
  }

  .font-showcase.system-font {
    background-color: var(--gray-6);
    border: 1px solid var(--gray-4);
  }

  .font-showcase.display-font {
    background-color: var(--brand-primary);
    color: white;
  }

  .font-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--gray-4);
  }

  .display-font .font-header {
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }

  .font-header h3 {
    font-size: var(--text-2xl);
    font-weight: 600;
    margin: 0;
  }

  .font-badge {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    background-color: var(--gray-5);
    padding: 4px 12px;
    border-radius: 6px;
  }

  .display-font .font-badge {
    color: white;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .font-samples {
    font-family: var(--font-system);
    margin-bottom: 24px;
  }

  .font-samples.serif {
    font-family: var(--font-display);
  }

  .font-sample {
    margin-bottom: 20px;
  }

  .sample-text.hero {
    font-size: var(--text-6xl);
    font-weight: 700;
    margin-bottom: 4px;
    color: var(--brand-primary);
  }

  .sample-text.heading {
    font-size: var(--text-4xl);
    font-weight: 600;
    margin-bottom: 4px;
  }

  .sample-text.subheading {
    font-size: var(--text-2xl);
    margin-bottom: 4px;
  }

  .sample-text.body {
    font-size: var(--text-base);
    margin-bottom: 4px;
    color: var(--text-secondary);
  }

  .sample-text.display-hero {
    font-size: var(--text-6xl);
    margin-bottom: 4px;
    font-weight: 700;
  }

  .sample-text.display-heading {
    font-size: var(--text-4xl);
    margin-bottom: 4px;
    font-weight: 600;
  }

  .sample-text.display-subheading {
    font-size: var(--text-2xl);
    margin-bottom: 4px;
  }

  .sample-text.display-body {
    font-size: var(--text-base);
    margin-bottom: 4px;
    opacity: 0.9;
  }

  .sample-meta {
    font-size: var(--text-xs);
    color: var(--text-secondary);
  }

  .display-font .sample-meta {
    opacity: 0.8;
  }

  .font-usage {
    font-size: var(--text-sm);
    padding-top: 16px;
    border-top: 1px solid var(--gray-4);
  }

  .display-font .font-usage {
    border-top-color: rgba(255, 255, 255, 0.2);
    opacity: 0.9;
  }

  /* Footer */
  .brand-footer {
    margin-top: 64px;
    padding: 32px 0;
    border-top: 1px solid var(--gray-4);
    text-align: center;
  }

  .brand-footer p {
    font-size: var(--text-sm);
    color: var(--text-secondary);
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translate3d(0, 20px, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
</style>
