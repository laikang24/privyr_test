import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  hook_id: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
