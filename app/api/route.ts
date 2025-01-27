import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../utils/prisma";

export async function GET() {
  const todos = await prisma.todos.findMany();
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await prisma.todos.create({
    data: {
      description: body.description,
    },
  });
  return NextResponse.json(body);
}
