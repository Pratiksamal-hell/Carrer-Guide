import express from "express";
import Roadmap from "../models/Roadmap.js";

const router = express.Router();


// ✅ 1. GENERATE + SAVE ROADMAP
router.post("/generate-roadmap", async (req, res) => {
  try {
    const { userId, goal, level } = req.body;

    // 🔥 Example AI response (replace with your real AI output)
    const generatedRoadmap = [
      {
        title: "Learn HTML",
        description: "Basics of HTML structure",
        link: "https://youtube.com/html",
      },
      {
        title: "Learn CSS",
        description: "Styling and layouts",
        link: "https://youtube.com/css",
      },
      {
        title: "Learn JavaScript",
        description: "Core JS concepts",
        link: "https://youtube.com/js",
      },
    ];

    // ✅ Convert into steps format
    const steps = generatedRoadmap.map((item) => ({
      title: item.title,
      description: item.description || "",
      resource: item.link || "",
    }));

    // ✅ Save to MongoDB
    const roadmap = new Roadmap({
      userId,
      title: goal,
      goal,
      level,
      steps,
    });

    await roadmap.save();

    res.status(201).json(roadmap);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});


// ✅ 2. FETCH USER ROADMAPS
router.get("/roadmaps/:userId", async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({
      userId: req.params.userId,
    });

    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ error: "Error fetching roadmaps" });
  }
});


// ✅ 3. UPDATE PROGRESS
router.put("/roadmap/progress/:id", async (req, res) => {
  try {
    const { stepIndex, completed } = req.body;

    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({ error: "Roadmap not found" });
    }

    roadmap.steps[stepIndex].completed = completed;

    await roadmap.save();

    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ error: "Failed to update progress" });
  }
});

export default router;