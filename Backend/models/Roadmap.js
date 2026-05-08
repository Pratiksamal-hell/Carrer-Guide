import mongoose from "mongoose";

// ✅ Each step inside roadmap
const stepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  resource: String, // YouTube / course link
  completed: {
    type: Boolean,
    default: false,
  },
});

// ✅ Main roadmap schema
const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String, // e.g. "Frontend Developer Roadmap"
      required: true,
    },

    goal: String,
    level: String,

    steps: [stepSchema], // 🔥 IMPORTANT (replaces "roadmap: Object")
  },
  { timestamps: true }
);

export default mongoose.model("Roadmap", roadmapSchema);