/**
 * Astro Middleware
 * Handles reverse proxy routing to backend services (matches platform pattern)
 */

import { defineMiddleware } from 'astro:middleware';

// Backend service URL (Fly.io)
const BACKEND_URL = 'https://capcheck-org-backend.fly.dev';

// Routes to proxy to Strapi backend
// Reference: https://docs.strapi.io/cms/api/rest
const PROXY_ROUTES = [
  // Public API
  '/api/',

  // Admin panel & APIs
  '/admin',
  '/content-manager',
  '/content-type-builder',

  // Media library
  '/upload',      // Upload plugin API (singular)
  '/uploads/',    // Serving uploaded files (plural)

  // Core plugins
  '/users-permissions',  // Users & Permissions plugin
  '/i18n/',              // Internationalization (core in v5)

  // Optional plugins (pre-configured for future use)
  '/graphql',            // GraphQL plugin
  '/email',              // Email plugin
  '/documentation',      // API Documentation plugin

  // System
  '/_health',
];

/**
 * Check if a path should be proxied to the backend
 */
function shouldProxy(pathname: string): boolean {
  return PROXY_ROUTES.some(route =>
    pathname === route.replace(/\/$/, '') || pathname.startsWith(route)
  );
}

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
  // Proxy backend routes to Strapi
  if (shouldProxy(url.pathname)) {
    const targetUrl = `${BACKEND_URL}${url.pathname}${url.search}`;

    // Clone request headers (excluding host)
    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      if (key.toLowerCase() !== 'host') {
        headers.set(key, value);
      }
    }

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers,
        body: request.method !== 'GET' && request.method !== 'HEAD'
          ? await request.arrayBuffer()
          : undefined,
        // Don't follow redirects automatically
        redirect: 'manual'
      });

      // Clone response headers
      const responseHeaders = new Headers();
      for (const [key, value] of response.headers.entries()) {
        // Skip hop-by-hop headers
        if (!['transfer-encoding', 'connection', 'keep-alive'].includes(key.toLowerCase())) {
          responseHeaders.set(key, value);
        }
      }

      // Add CORS headers for browser requests
      responseHeaders.set('Access-Control-Allow-Origin', url.origin);
      responseHeaders.set('Access-Control-Allow-Credentials', 'true');

      // Use arrayBuffer for binary-safe response handling
      const body = await response.arrayBuffer();

      return new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
      });
    } catch (error) {
      console.error(`Proxy error for ${url.pathname}:`, error);
      return new Response(JSON.stringify({ error: 'Backend service unavailable' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Handle CORS preflight for backend routes
  if (request.method === 'OPTIONS' && shouldProxy(url.pathname)) {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': url.origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // For all other routes, use Astro's default handler
  return next();
});
