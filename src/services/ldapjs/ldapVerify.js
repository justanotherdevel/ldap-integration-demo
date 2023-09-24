import ldap from "ldapjs";

async function verifyPasswords(
  url,
  port,
  adminDN,
  adminPassword,
  userDN,
  userPassword
) {
  const ldapClient = ldap.createClient({
    url: `ldap://${url}:${port}`, // LDAP server URL
  });

  function performBind(dn, password) {
    return new Promise((resolve, _reject) => {
      ldapClient.bind(dn, password, (bindErr) => {
        if (bindErr) {
          // Bind failed - Password is incorrect
          resolve(false);
        } else {
          // Bind succeeded - Password is correct
          resolve(true);
        }
      });
    });
  }

  try {
    // Verify admin password
    const adminPasswordCorrect = await performBind(adminDN, adminPassword);

    // Verify user password for cyberithub
    const userPasswordCorrect = await performBind(userDN, userPassword);

    // Close the LDAP client connection
    ldapClient.unbind((unbindErr) => {
      if (unbindErr) {
        console.error("LDAP unbind error:", unbindErr);
      } else {
        console.log("LDAP client disconnected.");
      }
    });

    // Return results as an object
    return {
      admin: adminPasswordCorrect,
      user: userPasswordCorrect,
    };
  } catch (error) {
    console.error("Error:", error);

    // Return results with both flags set to false in case of an error
    return {
      admin: false,
      user: false,
    };
  }
}

// Example usage:
// const url = "10.31.37.132";
// const port = 389;
// const adminDN = "cn=service,dc=test,dc=com";
// const adminPassword = "test@12345";
// const userDN = "uid=cyberithub,ou=servicegroup,dc=test,dc=com";
// // const userPassword = "test@12345";
// const userPassword = "test@1234";

export { verifyPasswords };
