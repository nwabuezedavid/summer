import { matureInvestments } from "@/action/matureInvestments";

export async function GET() {
  const result = await matureInvestments();
  return Response.json(result);
}
