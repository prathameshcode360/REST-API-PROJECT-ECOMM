import mongoose from "mongoose";

const cartSchemas = mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId.ref("users"),
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId.ref("products"),
    required: true,
  },
  quatity: {
    type: Number,
    default: 1,
  },
});
export default cartSchemas;
