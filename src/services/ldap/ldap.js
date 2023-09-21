import connectDB from "@/app/middleware/mongodb";
import LdapConn from "@/app/model/ldapConn";
import OTP from "@/app/model/otp";
import { sendOtpEmail } from "@/utils/mail";

const changeLdapPasswordHandler = async (org, ldapData) => {
  const ldapConn = await LdapConn.findOne({ org: org });
  if (
    ldapData.email === ldapConn.email &&
    ldapConn.user_password === ldapData.user_password
  ) {
    ldapConn.user_password = ldapData.new_password;
    await ldapConn.save();
  } else {
    throw new Error("Invalid email or old password");
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
  ldapConn.user_password = data.password;
  await ldapConn.save();
  return { msg: "Password changed" };
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
export const genOtp = connectDB(genOtpHandler);
export const verifyOtpAndChangePassword = connectDB(
  verifyOtpAndChangePasswordHandler
);
