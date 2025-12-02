/**
 * cla-submission controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::cla-submission.cla-submission', ({ strapi }) => ({
  // Override find to only return limited fields for security
  async find(ctx) {
    // Only allow email filter for public access
    const filters = (ctx.query.filters || {}) as { email?: string };
    const { email } = filters;

    if (!email) {
      // If no email filter, return empty for public safety
      return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
    }

    const result = await strapi.documents('api::cla-submission.cla-submission').findFirst({
      filters: { email: email as string },
    });

    if (result) {
      return {
        data: [{
          id: result.id,
          documentId: result.documentId,
          signedAt: result.signedAt,
        }],
        meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
      };
    }

    return { data: [], meta: { pagination: { page: 1, pageSize: 25, pageCount: 0, total: 0 } } };
  },

  // Override create to inject IP address
  async create(ctx) {
    // Get IP address from request
    const forwardedFor = ctx.request.headers['x-forwarded-for'];
    const forwardedIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]?.split(',')[0]?.trim()
      : forwardedFor?.split(',')[0]?.trim();

    const ipAddress = ctx.request.ip ||
      forwardedIp ||
      ctx.request.headers['x-real-ip'] ||
      '0.0.0.0';

    // Inject IP address into the request body
    if (ctx.request.body?.data) {
      ctx.request.body.data.ipAddress = ipAddress;
    }

    // Call the default create action
    const response = await super.create(ctx);
    return response;
  },
}));
