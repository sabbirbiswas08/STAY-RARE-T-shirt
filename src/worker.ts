interface Env {
  DB: D1Database;
  ASSETS: any;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle POST requests to /api/order
    if (url.pathname === '/api/order' && request.method === 'POST') {
      try {
        const data = await request.json() as {
          customer_name?: string;
          email?: string;
          address?: string;
          size?: string;
          quantity?: number;
          notes?: string;
        };

        // Insert order into D1 database
        await env.DB.prepare(
          `INSERT INTO orders (customer_name, email, address, size, quantity, notes)
           VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(
          data.customer_name || '',
          data.email || '',
          data.address || '',
          data.size || '',
          data.quantity || 1,
          data.notes || ''
        ).run();

        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200,
        });
      } catch (error: any) {
        console.error('Error processing order:', error);
        return new Response(JSON.stringify({ 
          success: false, 
          error: error.message || 'Failed to process order' 
        }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        });
      }
    }

    // For all other requests, serve static assets
    return env.ASSETS.fetch(request);
  },
};
