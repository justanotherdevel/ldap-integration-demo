import { getAllUsers } from "@/services/ldap/getUser";

export async function GET(req) {
  try {
    const page = req.nextUrl.searchParams.get("page") || 1;
    const pageSize = req.nextUrl.searchParams.get("pageSize") || 10;
    const users = await getAllUsers(page, pageSize);
    return new Response(JSON.stringify(users));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
