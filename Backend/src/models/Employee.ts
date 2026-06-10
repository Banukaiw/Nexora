import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resetToken: String,
  otp: String,
  otpExpires: Date,

});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
export default EmployeeModel;
