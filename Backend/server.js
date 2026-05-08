import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import Roadmap from "./models/Roadmap.js";
import Video from "./models/Video.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ================================
   ✅ TEST ROUTE
================================ */
app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

/* ================================
   ✅ MONGODB CONNECTION
================================ */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* ================================
   🎥 YOUTUBE FUNCTION
================================ */
const getYouTubeVideos = async (skill) => {
  try {
    const existing = await Video.findOne({ skill });
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

    if (existing) {
      const isExpired = new Date() - new Date(existing.updatedAt) > SEVEN_DAYS;
      if (!isExpired) return existing.videos;
    }

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        skill + " tutorial"
      )}&type=video&maxResults=2&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = await res.json();

    const videos = (data.items || []).map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    await Video.findOneAndUpdate(
      { skill },
      { videos },
      { upsert: true, new: true }
    );

    return videos;
  } catch (err) {
    console.error("YouTube Error:", err);
    return [];
  }
};

/* ================================
   🔐 SIGNUP
================================ */
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({
      message: "Signup successful",
      user: { id: newUser._id, name, email },
    });
  } catch {
    res.status(500).json({ error: "Signup failed" });
  }
});

/* ================================
   🔐 LOGIN
================================ */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
});

/* ================================
   🤖 GENERATE ROADMAP (FIXED)
================================ */
app.post("/generate-roadmap", async (req, res) => {
  try {
    const { goal, level } = req.body;

    const prompt = `
Create a roadmap for ${goal} (${level}).
Return ONLY JSON:
{
  "phases": [
    { "title": "Phase 1", "skills": ["HTML","CSS"] }
  ]
}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";

    console.log("AI RESPONSE:", text);

    let parsed;
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON found");
      parsed = JSON.parse(match[0]);
    } catch (err) {
      console.error("Parse error:", err);
      return res.status(500).json({ error: "Invalid AI response" });
    }

    parsed.phases = await Promise.all(
      (parsed.phases || []).map(async (phase) => {
        const skills = await Promise.all(
          (phase.skills || []).slice(0, 3).map(async (skill) => ({
            name: skill,
            videos: await getYouTubeVideos(skill),
          }))
        );
        return { ...phase, skills };
      })
    );

    res.json({ roadmap: parsed });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

/* ================================
   💾 SAVE ROADMAP
================================ */
app.post("/save-roadmap", async (req, res) => {
  try {
    const { userId, goal, level, roadmap } = req.body;

    const steps = [];

    roadmap.phases.forEach((phase) => {
      phase.skills.forEach((skill) => {
        steps.push({
          title: skill.name,
          description: `Learn ${skill.name}`,
          resource: skill.videos?.[0]?.videoId
            ? `https://youtube.com/watch?v=${skill.videos[0].videoId}`
            : "",
          completed: false,
        });
      });
    });

    const newRoadmap = new Roadmap({
      userId,
      title: goal,
      goal,
      level,
      steps,
    });

    await newRoadmap.save();

    res.json(newRoadmap);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Save failed" });
  }
});

/* ================================
   📥 GET ROADMAPS
================================ */
app.get("/my-roadmaps/:userId", async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(roadmaps);
  } catch {
    res.status(500).json({ error: "Fetch failed" });
  }
});

/* ================================
   ✅ UPDATE PROGRESS
================================ */
app.put("/roadmap/progress/:id", async (req, res) => {
  try {
    const { stepIndex, completed } = req.body;

    const roadmap = await Roadmap.findById(req.params.id);

    roadmap.steps[stepIndex].completed = completed;
    await roadmap.save();

    res.json(roadmap);
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});

/* ================================
   🚀 START SERVER
================================ */
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});