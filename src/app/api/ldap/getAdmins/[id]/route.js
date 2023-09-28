import {
  deleteLdapAdmin,
  editLdapAdmin,
  findLdapAdmin,
} from "@/services/ldapAdmin/connections";

export async function GET(_req, { params }) {
  const { id } = params;
  try {
    const res = await findLdapAdmin(id);
    if (!res) {
      return new Response(JSON.stringify({ message: "No such entry" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ ldap: res }));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const body = await req.json();
  const { id } = params;
  try {
    const { data } = body;
    console.log(data);
    const res = await editLdapAdmin(id, data);
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

export async function DELETE(_req, { params }) {
  const { id } = params;
  try {
    const res = await deleteLdapAdmin(id);
    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
