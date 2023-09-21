import connectDB from "@/app/middleware/mongodb";
import LdapConn from "@/app/model/ldapConn";

const getAllLdapConnsHandler = async () => {
  const ldapConns = await LdapConn.find({});
  return ldapConns;
};

const findLdapConnHandler = async (org) => {
  const ldapConn = await LdapConn.findOne({ org: org });
  return ldapConn;
};

const findLdapConnNonAdminHandler = async (org) => {
  const ldapConn = await LdapConn.findOne({ org: org }).select(
    "-user_password"
  );
  return ldapConn;
};

const editLdapConnHandler = async (org, ldapData) => {
  const ldapConn = await LdapConn.findOneAndUpdate({ org: org }, ldapData, {
    new: true,
    runValidators: true,
  });
  return ldapConn;
};

const newLdapDataEntryHandler = async (ldapData) => {
  const ldapConn = new LdapConn(ldapData);
  await ldapConn.save();
  return ldapConn;
};

const deleteLdapDataEntryHandler = async (org) => {
  return await LdapConn.findOneAndDelete({ org: org });
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
    email: "test@email.com",
    phone: "9988775544",
  });
  const test = await ldapConn.save();
  console.log("fillDummyData", test);
  return ldapConn;
};

export const fillDummyData = connectDB(fillDummyDataHandler);
export const getAllLdapConns = connectDB(getAllLdapConnsHandler);
export const newLdapDataEntry = connectDB(newLdapDataEntryHandler);
export const deleteLdapDataEntry = connectDB(deleteLdapDataEntryHandler);
export const findLdapConn = connectDB(findLdapConnHandler);
export const editLdapConn = connectDB(editLdapConnHandler);
export const findLdapConnNonAdmin = connectDB(findLdapConnNonAdminHandler);
