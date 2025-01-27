import { prisma } from "@/app/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ tid: string }> } // Type the params correctly
) {
  const body = await req.json();
  const updateTodo = await prisma.todos.update({
    where: { id: parseInt((await params).tid, 10) },
    data: {
      description: body.description,
    },
  });
  return NextResponse.json(updateTodo);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tid: string }> } // Type the params correctly
) {
  const todo = await prisma.todos.findUnique({
    where: { id: parseInt((await params).tid, 10) },
  });
  return NextResponse.json(todo);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tid: string }> } // Type the params correctly
) {
  const deleteTodo = await prisma.todos.delete({
    where: { id: parseInt((await params).tid, 10) },
  });
  return NextResponse.json(deleteTodo);
}
