import express from "express";
import { seedData } from "../controllers/seedData.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await seedData();
    res.status(200).json({ message: "Data seeded successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding data", error: error.message });
  }
});

export default router;
