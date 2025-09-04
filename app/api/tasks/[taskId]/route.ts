import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ taskId: string }> }
): Promise<Response> {
  const { taskId } = await context.params;
  return Response.json({ taskId, title: "Sample Task" });
}
