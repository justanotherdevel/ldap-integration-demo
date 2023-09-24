import ldap from "ldapjs";

async function modifyUserPassword(
  host,
  port,
  adminDN,
  adminPassword,
  newPassword,
  dn
) {
  // Construct the LDAP server URL
  const url = `ldap://${host}:${port}`;

  // LDAP server connection settings
  const client = ldap.createClient({
    url: url,
  });

  // Modify details
  const change = new ldap.Change({
    operation: "replace",
    modification: new ldap.Attribute({
      type: "userPassword",
      values: [newPassword],
    }),
  });

  try {
    // Perform LDAP bind
    await new Promise((resolve, reject) => {
      client.bind(adminDN, adminPassword, (bindErr) => {
        if (bindErr) {
          reject(new Error("LDAP Bind Error"));
        } else {
          resolve();
        }
      });
    });

    // Perform LDAP modify operation
    await new Promise((resolve, reject) => {
      client.modify(dn, change, (modifyErr) => {
        if (modifyErr) {
          reject(new Error("LDAP Modify error"));
        } else {
          resolve();
        }
      });
    });

    // Close the LDAP client connection
    await new Promise((resolve, reject) => {
      client.unbind((unbindErr) => {
        if (unbindErr) {
          reject(new Error("LDAP Unbind error"));
        } else {
          resolve();
        }
      });
    });

    return true; // Password modification was successful
  } catch (error) {
    return false; // Password modification failed
  }
}

// Example usage:
// const host = "10.31.37.132";
// const port = 389;
// const adminDN = "cn=service,dc=test,dc=com";
// const adminPassword = "test@12345";
// const newPassword = "test@12345";
// const dn = "uid=cyberithub,ou=servicegroup,dc=test,dc=com";

export { modifyUserPassword };
// modifyUserPassword(host, port, adminDN, adminPassword, newPassword, dn);
