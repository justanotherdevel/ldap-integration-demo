import { getAllLdapConns } from "@/services/ldap/connections";
export async function GET() {
  const res = await getAllLdapConns();
  return new Response(JSON.stringify(res));
}
