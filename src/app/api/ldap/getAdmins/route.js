import {
  getAllLdapAdmins,
  newLdapAdmin,
} from "@/services/ldapAdmin/connections";
export async function GET() {
  const res = await getAllLdapAdmins();
  return new Response(JSON.stringify(res));
}

export async function POST(req) {
  const body = await req.json();
  try {
    const { data } = body;
    const res = await newLdapAdmin(data);
    return new Response(JSON.stringify(res));
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return new Response(JSON.stringify("Invalid Credentials"), {
        status: 401,
      });
    } else if (error.message === "Duplicate entry. Please check org field") {
      return new Response(
        JSON.stringify("Duplicate entry. Please check org field"),
        {
          status: 409,
        }
      );
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
