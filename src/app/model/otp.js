import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  org: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  otp: { type: String, required: true },
  // Set the expiry time 20 minutes from now
  expiry: { type: Date, default: Date.now, expires: 1200 },
});

const OTP = mongoose.models.OTP ?? mongoose.model("OTP", otpSchema);

export default OTP;
