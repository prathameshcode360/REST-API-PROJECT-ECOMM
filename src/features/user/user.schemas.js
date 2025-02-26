import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
    vaildate: {
      validator: function (value) {
        return value.length >= 6;
      },
      message: "password must be at least 6 characters long",
    },
  },
  type: {
    type: String,
    required: true,
    enum: ["seller", "customer"],
  },
});
export default userSchema;
