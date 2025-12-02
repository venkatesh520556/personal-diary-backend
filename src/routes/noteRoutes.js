import express from "express";
import Note from "../models/Note.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ⭐ CREATE NOTE (Only for logged-in user)
router.post("/", auth, async (req, res) => {
  try {
    const { title, content, date } = req.body;

    const note = await Note.create({
      title,
      content,
      date,
      user: req.user, // logged-in user's ID
    });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ⭐ GET ALL NOTES OF LOGGED-IN USER
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user }).sort({ date: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ⭐ UPDATE NOTE (Only if the note belongs to the user)
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content, date } = req.body;

    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, // user-check
      { title, content, date },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Note not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ⭐ DELETE NOTE (Only if it belongs to user)
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!deleted) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
