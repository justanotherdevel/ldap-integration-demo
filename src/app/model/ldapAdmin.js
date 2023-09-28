import mongoose from "mongoose";

const ldapAdminSchema = new mongoose.Schema({
  org: { type: String, required: true, unique: true },
  ldap_host: { type: String, required: true },
  ldap_port: { type: Number, required: true },
  admin_dn: { type: String, required: true },
  admin_password: { type: String, required: true },
  base_dn: { type: String, required: true },
  phoneOtp: { type: Boolean, default: false },
});

const LdapAdmin =
  mongoose.models.LdapAdmin ?? mongoose.model("LdapAdmin", ldapAdminSchema);

export default LdapAdmin;
