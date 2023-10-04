import connectDB from "@/app/middleware/mongodb";
import LdapConn from "@/app/model/ldapConn";
import OTP from "@/app/model/otp";
import { verifyPasswords } from "../ldapjs/ldapVerify";
import { sendOtpEmail } from "@/utils/mail";
import { modifyUserPassword } from "../ldapjs/changePassword";
import LdapUser from "@/app/model/ldapUser";

const changeLdapPasswordHandler2 = async (ldapData) => {
  const user = await LdapUser.findOne({ email: ldapData.email }).populate(
    "admin"
  );
  if (!user) {
    throw new Error("Invalid email");
  }
  console.log(user);
  const res = await verifyPasswords(
    user.admin.ldap_host,
    user.admin.ldap_port,
    user.admin.admin_dn,
    user.admin.admin_password,
    user.user_dn,
    ldapData.user_password
  );
  console.log(res);
  if (res.user == true) {
    let success = await modifyUserPassword(
      user.admin.ldap_host,
      user.admin.ldap_port,
      user.admin.admin_dn,
      user.admin.admin_password,
      ldapData.new_password,
      user.user_dn
    );
    if (!success) {
      throw new Error("Password change failed");
    }
  } else {
    throw new Error("Invalid old password");
  }
  return user;
};

const changeLdapPasswordHandler = async (org, ldapData) => {
  const ldapConn = await LdapConn.findOne({ org: org });
  if (ldapData.email === ldapConn.email) {
    const res = await verifyPasswords(
      ldapConn.ldap_host,
      ldapConn.ldap_port,
      ldapConn.admin_dn,
      ldapConn.admin_password,
      ldapConn.user_dn,
      ldapData.user_password
    );
    console.log(res);
    if (res.user == true) {
      let success = await modifyUserPassword(
        ldapConn.ldap_host,
        ldapConn.ldap_port,
        ldapConn.admin_dn,
        ldapConn.admin_password,
        ldapData.new_password,
        ldapConn.user_dn
      );
      if (!success) {
        throw new Error("Password change failed");
      }
      ldapConn.user_password = ldapData.new_password;
      await ldapConn.save();
    } else {
      throw new Error("Invalid old password");
    }
  } else {
    throw new Error("Invalid email");
  }
  return ldapConn;
};

const verifyOtpAndChangePasswordHandler = async (org, data) => {
  const ldapConn = await LdapConn.findOne({ org: org });
  if (!ldapConn) {
    throw new Error("LDAP connection not found");
  }
  if (data.email !== ldapConn.email) {
    throw new Error("Invalid email");
  }
  const otp = await OTP.findOne({ org: org });
  if (!otp) {
    throw new Error("OTP not found");
  }
  if (otp.otp !== data.otp) {
    throw new Error("Invalid OTP");
  }
  await OTP.deleteOne({ org: org });
  let success = await modifyUserPassword(
    ldapConn.ldap_host,
    ldapConn.ldap_port,
    ldapConn.admin_dn,
    ldapConn.admin_password,
    data.password,
    ldapConn.user_dn
  );
  console.log(success);
  if (!success) {
    throw new Error("Password change failed");
  }
  ldapConn.user_password = data.password;
  await ldapConn.save();
  return { msg: "Password changed" };
};

const verifyOtpAndChangePasswordHandler2 = async (data) => {
  const user = await LdapUser.findOne({ email: data.email }).populate("admin");
  if (!user) {
    throw new Error("LDAP connection not found");
  }
  const otp = await OTP.findOne({ email: data.email });
  if (!otp) {
    throw new Error("OTP not found");
  }
  if (otp.otp !== data.otp) {
    throw new Error("Invalid OTP");
  }
  await OTP.deleteOne({ email: data.email });
  let success = await modifyUserPassword(
    user.admin.ldap_host,
    user.admin.ldap_port,
    user.admin.admin_dn,
    user.admin.admin_password,
    data.password,
    user.user_dn
  );
  console.log(success);
  if (!success) {
    throw new Error("Password change failed");
  }
  return { msg: "Password changed" };
};

const genOtp2Handler = async (email) => {
  try {
    const user = await LdapUser.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpData = {
      email: email,
      otp: otp.toString(),
    };
    const otpExist = await OTP.findOne({ email: email });
    if (otpExist) {
      const res = await sendOtpEmail(email, otpExist.otp);
      if (res.success) {
        return { msg: "resent otp" };
      } else {
        return { msg: "otp not sent" };
      }
    }
    const otpEntry = await OTP.create(otpData);
    if (otpEntry) {
      const res = await sendOtpEmail(email, otp);
      if (res.success) {
        return { msg: "resent otp" };
      } else {
        return { msg: "otp not sent" };
      }
    }
    return { msg: "otp not sent" };
  } catch (error) {
    if (error.message === "User not found") {
      throw new Error("User not found");
    }
    throw new Error("Something went wrong");
  }
};

const genOtpHandler = async (org, email) => {
  const ldapConn = await LdapConn.findOne({ org: org });
  if (!ldapConn) {
    throw new Error("LDAP connection not found");
  }
  if (email !== ldapConn.email) {
    throw new Error("Invalid email");
  }
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpData = {
    org: org,
    email: ldapConn.org,
    otp: otp.toString(),
  };
  try {
    const doesOtpExist = await OTP.findOne({ org: org });
    if (doesOtpExist) {
      sendOtpEmail(email, doesOtpExist.otp);
      return { msg: "resent otp" };
    }
    const otpEntry = await OTP.create(otpData);
    if (otpEntry) {
      sendOtpEmail(email, otpEntry.otp);
      return { msg: "otp sent" };
    }
    return { msg: "otp not sent" };
  } catch (error) {
    console.error(error);
    return { msg: "Something went wrong" };
  }
};

export const changeLdapPassword = connectDB(changeLdapPasswordHandler);
export const changeLdapPassword2 = connectDB(changeLdapPasswordHandler2);
export const genOtp = connectDB(genOtpHandler);
export const genOtp2 = connectDB(genOtp2Handler);
export const verifyOtpAndChangePassword = connectDB(
  verifyOtpAndChangePasswordHandler
);
export const verifyOtpAndChangePassword2 = connectDB(
  verifyOtpAndChangePasswordHandler2
);
