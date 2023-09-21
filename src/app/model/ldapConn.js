import mongoose from "mongoose";

const ldapSchema = new mongoose.Schema({
  org: { type: String, required: true, unique: true },
  ldap_host: { type: String, required: true },
  ldap_port: { type: Number, required: true },
  user_dn: { type: String, required: true },
  user_password: { type: String, required: true },
  cbic_orgn: { type: String, required: true },
  para_with_uid: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  phoneOtp: { type: Boolean },
});

const LdapConn =
  mongoose.models.LdapConn ?? mongoose.model("LdapConn", ldapSchema);

export default LdapConn;
