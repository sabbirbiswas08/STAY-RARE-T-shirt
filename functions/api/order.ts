export async function onRequestPost(context: { request: Request; env: { DB: D1Database } }) {
  const data = await context.request.json();

  await context.env.DB.prepare(
    `INSERT INTO orders (customer_name, email, address, size, quantity, notes)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(
    data.customer_name || "",
    data.email || "",
    data.address || "",
    data.size || "",
    data.quantity || 1,
    data.notes || ""
  ).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
