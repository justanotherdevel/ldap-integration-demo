import {
  deleteLdapDataEntry,
  findLdapConn,
  editLdapConn,
} from "@/services/ldap/connections";

export async function GET(_req, { params }) {
  const { id } = params;
  try {
    const res = await findLdapConn(id);
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
    console.log(id);
    const res = await editLdapConn(id, data);
    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const { id } = params;
  try {
    const res = await deleteLdapDataEntry(id);
    return new Response(JSON.stringify(res));
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
