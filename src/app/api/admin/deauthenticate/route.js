import { NextResponse } from "next/server";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "@/app/const";

function generateToken(username) {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET || "123", {
    expiresIn: "30d",
  });
}

export async function POST(_req) {
  let status = 200;
  try {
    const token = generateToken("logged out");
    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    const response = {
      message: `Logged out`,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Set-Cookie": serialized,
      },
    });
  } catch (error) {
    if (status === 200) {
      status = 403;
    }
    console.error("admin/deauthenticate/post", error);
    return NextResponse.json(JSON.stringify(error), { status: status });
  }
}
