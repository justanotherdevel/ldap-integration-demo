import connectDB from "@/app/middleware/mongodb";
import LdapAdmin from "@/app/model/ldapAdmin";
import LdapUser from "@/app/model/ldapUser";
import { fetchAllUsers } from "../ldap/getUser";
import { verifySinglePassword } from "../ldapjs/ldapVerify";

const getAllLdapAdminsHandler = async () => {
  const ldapAdmins = await LdapAdmin.find({});
  return ldapAdmins;
};

const findLdapAdminHandler = async (org) => {
  const ldapAdmin = await LdapAdmin.findOne({ org: org });
  return ldapAdmin;
};

const editLdapAdminHandler = async (org, ldapData) => {
  const res = await verifySinglePassword(
    ldapData.ldap_host,
    ldapData.ldap_port,
    ldapData.admin_dn,
    ldapData.admin_password
  );
  if (!res.verified) {
    throw new Error("Invalid credentials");
  }
  const ldap = await LdapAdmin.findOne({ org: org });
  if (ldap) {
    await LdapUser.deleteMany({ admin: ldap });
  }
  const ldapAdmin = await LdapAdmin.findOneAndUpdate({ org: org }, ldapData, {
    new: true,
    runValidators: true,
  });

  const tmp = await fetchAllUsers(ldapData.org);
  const ret = {
    ldapAdmin: ldapAdmin,
    users: tmp.users,
    duplicate: tmp.duplicate,
  };
  return ret;
};

const newLdapAdminHandler = async (ldapData) => {
  try {
    const res = await verifySinglePassword(
      ldapData.ldap_host,
      ldapData.ldap_port,
      ldapData.admin_dn,
      ldapData.admin_password
    );
    if (!res.verified) {
      throw new Error("Invalid credentials");
    }
    const ldapAdmin = new LdapAdmin(ldapData);
    await ldapAdmin.save();

    const tmp = await fetchAllUsers(ldapData.org);
    const ret = {
      ldapAdmin: ldapAdmin,
      users: tmp.users,
      duplicate: tmp.duplicate,
    };
    // Add logic to add all users here or maybe call a separate api
    return ret;
  } catch (err) {
    if (err.code === 11000) {
      console.log("Duplicate entry");
      throw new Error("Duplicate entry. Please check org field");
    } else {
      console.error(err);
    }
    throw err;
  }
};

const deleteLdapAdminHandler = async (org) => {
  const res = await LdapAdmin.findOne({ org: org });
  if (res) {
    await LdapUser.deleteMany({ admin: res });
  }
  return await LdapAdmin.findOneAndDelete({ org: org });
};

export const getAllLdapAdmins = connectDB(getAllLdapAdminsHandler);
export const findLdapAdmin = connectDB(findLdapAdminHandler);
export const editLdapAdmin = connectDB(editLdapAdminHandler);
export const newLdapAdmin = connectDB(newLdapAdminHandler);
export const deleteLdapAdmin = connectDB(deleteLdapAdminHandler);
