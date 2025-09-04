export async function POST(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ status: "ok", action: "reset-password" }), {
    headers: { "content-type": "application/json" },
  });
}
