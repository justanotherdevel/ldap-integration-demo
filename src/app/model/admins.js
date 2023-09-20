import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

adminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw new Error(error);
  }
});

// adminSchema.methods.matchPassword = async function (enteredPassword) {
//   console.log("enteredPassword", enteredPassword);
//   return await bcrypt.compare(enteredPassword, this.password);
// };
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.models.Admin ?? mongoose.model("Admin", adminSchema);

export default Admin;
