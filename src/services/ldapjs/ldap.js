const ldap = require("ldapjs");

const client = ldap.createClient({
  url: "ldap://10.31.37.132:389",
});

const bindDN = "cn=service,dc=test,dc=com"; // Replace with your Bind DN
const bindPassword = "test@12345"; // Replace with your password
const searchBase = "dc=test,dc=com"; // Replace with your search base DN
const searchFilter = "(objectClass=*)"; // You can customize the filter as needed
const searchOptions = {
  scope: "sub", // Change this to the appropriate search scope
  sizeLimit: 1000, // Equivalent to X-COUNT-LIMIT
};

client.bind(bindDN, bindPassword, (err) => {
  if (err) {
    console.error("Bind error:", err);
    return;
  }

  client.search(searchBase, searchOptions, (searchErr, searchRes) => {
    if (searchErr) {
      console.error("Search error:", searchErr);
    }

    searchRes.on("searchEntry", (entry) => {
      console.log("Found entry:", entry.entry);
    });

    searchRes.on("error", (err) => {
      console.error("Search result error:", err);
    });

    searchRes.on("end", () => {
      console.log("Search finished.");
      client.unbind((unbindErr) => {
        if (unbindErr) {
          console.error("Unbind error:", unbindErr);
        } else {
          console.log("Disconnected from LDAP server.");
        }
      });
    });
  });
});
