export async function GET(): Promise<Response> {
  return new Response(JSON.stringify({ boards: [] }), {
    headers: { "content-type": "application/json" },
  });
}
