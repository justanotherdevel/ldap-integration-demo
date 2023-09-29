import { COOKIE_NAME } from "../../../const/index";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const cookieStore = cookies();
    if (!cookieStore) {
      return new NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const token = cookieStore.get(COOKIE_NAME);
    if (!token) {
      return new NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const { value } = token;
    const user = verify(value, process.env.TOKEN_SECRET || "123");
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error("error at me/route", error);
    return new NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
