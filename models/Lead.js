import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
