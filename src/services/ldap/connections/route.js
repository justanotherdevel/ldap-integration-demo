import connectDB from "@/app/middleware/mongodb";
import LdapConn from "@/app/model/ldapConn";

const getAllLdapConnsHandler = async () => {
  console.log("getAllLdapConns");
  const ldapConns = await LdapConn.find({});
  return ldapConns;
};

const fillDummyDataHandler = async () => {
  const ldapConn = new LdapConn({
    org: "org",
    ldap_host: "ldap_host",
    ldap_port: 123,
    user_dn: "user_dn",
    user_password: "user_password",
    cbic_orgn: "cbic_orgn",
    para_with_uid: "para_with_uid",
  });
  const test = await ldapConn.save();
  console.log("fillDummyData", test);
  return ldapConn;
};

export const fillDummyData = connectDB(fillDummyDataHandler);
export const getAllLdapConns = connectDB(getAllLdapConnsHandler);
