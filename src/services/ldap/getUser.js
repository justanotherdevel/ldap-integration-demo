import LdapUser from "@/app/model/ldapUser";
import { searchAccountsByMail } from "../ldapjs/getAllUsers";
import LdapAdmin from "@/app/model/ldapAdmin";

export async function fetchAllUsers(org) {
  try {
    const admin = await LdapAdmin.findOne({ org: org });
    if (!admin) {
      throw new Error("No such entry");
    }

    const { ldap_host, ldap_port, admin_dn, admin_password, base_dn } = admin;
    await LdapUser.deleteMany({ admin: admin });
    let duplicate = 0;
    let error = 0;

    const users = await new Promise((resolve, reject) => {
      searchAccountsByMail(
        ldap_host,
        ldap_port,
        admin_dn,
        admin_password,
        base_dn,
        (error, accounts) => {
          if (error) {
            reject(error); // Reject with error
          } else {
            resolve(accounts); // Resolve with accounts
          }
        }
      );
    });

    // Use Promise.all to wait for all user creations
    await Promise.all(
      users.map(async (user) => {
        try {
          const ldapUser = new LdapUser({
            email: user.mail[0],
            phone: user.telephoneNumber ? user.telephoneNumber[0] : null,
            user_dn: user.dn,
            admin: admin,
          });
          await ldapUser.save();
        } catch (error) {
          if (error.code === 11000) {
            duplicate++;
          } else {
            console.log(user);
            console.error("error in fetchAllUsers", error);
            error++;
          }
        }
      })
    );
    const ret = {
      users: users.length - duplicate,
      duplicate: duplicate,
      error: error,
    };
    return ret;
  } catch (error) {
    console.error("error in fetchAllUsers", error);
    throw error;
  }
}

export async function getAllUsers(page, pageSize) {
  try {
    page = page || 1;
    pageSize = pageSize || 10;
    const count = await LdapUser.countDocuments({});
    const users = await LdapUser.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate("admin", "org");
    const ret = {
      page: page,
      pageSize: pageSize,
      count: count,
      users: users,
    };
    return ret;
  } catch (error) {
    console.error("error in getAllUsers", error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const user = await LdapUser.findOne({ email: email }).populate("admin");
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
