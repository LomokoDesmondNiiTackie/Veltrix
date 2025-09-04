import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ boardId: string }> }
): Promise<Response> {
  const { boardId } = await context.params;
  return Response.json({ boardId, title: "Sample Board" });
}
