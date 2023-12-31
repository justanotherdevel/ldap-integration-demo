import { getAllLdapConns, newLdapDataEntry } from "@/services/ldap/connections";
export async function GET() {
  const res = await getAllLdapConns();
  return new Response(JSON.stringify(res));
}

export async function POST(req) {
  const body = await req.json();
  try {
    const { data } = body;
    const res = await newLdapDataEntry(data);
    return new Response(JSON.stringify(res));
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return new Response(JSON.stringify("Invalid Credentials"), {
        status: 401,
      });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
