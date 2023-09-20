import { NextResponse } from "next/server";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../../../const";
import { adminLogin } from "../../../../services/admin/authenticate";

function generateToken(username) {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET || "123", {
    expiresIn: "30d",
  });
}

export async function POST(req) {
  const body = await req.json();
  let status = 200;
  const { username, name, password } = body;
  try {
    const req = { username: username, password: password, name: name };
    const user = await adminLogin(req);
    if (!user || user.msg) {
      if (!user) {
        status = 404;
        throw new Error("User not found");
      }
      throw new Error("Invalid username or password");
    }
    const token = generateToken(username);
    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    const response = {
      message: `Authenticated as ${username}`,
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
    console.error("admin/authenticate/post", error);
    return NextResponse.json(JSON.stringify(error), { status: status });
  }
}
