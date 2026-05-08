import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
    unique: true, // one cache per skill
  },
  videos: [
    {
      title: String,
      videoId: String,
      thumbnail: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Video", videoSchema);