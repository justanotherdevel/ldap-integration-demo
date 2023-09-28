import ldap from "ldapjs";
export function searchAccountsByMail(
  host,
  port,
  adminDN,
  adminPassword,
  baseDN,
  callback
) {
  const client = ldap.createClient({
    url: `ldap://${host}:${port}`,
  });

  client.bind(adminDN, adminPassword, (bindErr) => {
    if (bindErr) {
      callback(bindErr, null);
      return;
    }

    const opts = {
      filter: "(mail=*)",
      scope: "sub",
      attributes: ["*"], // Specify the attributes you want to retrieve
    };

    client.search(baseDN, opts, (searchErr, searchRes) => {
      const accounts = [];

      if (searchErr) {
        callback(searchErr, null);
        return;
      }

      searchRes.on("searchEntry", (entry) => {
        const attributes = {};
        attributes["dn"] = entry.dn.toString(); // Access DN
        entry.attributes.forEach((attribute) => {
          attributes[attribute.type] = attribute.values; // Access attribute values
        });

        accounts.push(attributes);
      });

      searchRes.on("end", () => {
        client.unbind();
        callback(null, accounts);
      });
    });
  });
}

// Example usage:
// searchAccountsByMail(
//   "10.31.37.132",
//   389,
//   "cn=service,dc=test,dc=com",
//   "test@12345",
//   "dc=test,dc=com",
//   (error, accounts) => {
//     if (error) {
//       console.error("LDAP search error:", error);
//     } else {
//       console.log("LDAP search result:", accounts);
//     }
//   }
// );
