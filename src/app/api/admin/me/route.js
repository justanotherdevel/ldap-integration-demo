import { COOKIE_NAME } from "../../../const/index";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  if (!token) {
    return new NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { value } = token;
  try {
    const user = verify(value, process.env.TOKEN_SECRET || "123");
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
