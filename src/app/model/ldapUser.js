import mongoose from "mongoose";
import { Schema } from "mongoose";

const ldapUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  admin: { type: Schema.Types.ObjectId, ref: "LdapAdmin" },
  user_dn: { type: String, required: true },
  phone: { type: String },
});

const LdapUser =
  mongoose.models.LdapUser ?? mongoose.model("LdapUser", ldapUserSchema);

export default LdapUser;
