export async function POST(req: Request): Promise<Response> {
  return new Response(JSON.stringify({ status: "ok", action: "login" }), {
    headers: { "content-type": "application/json" },
  });
}
