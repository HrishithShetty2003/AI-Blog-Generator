import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  generatePost,
  getPosts,
  deletePost
} from "../controllers/postController.js";

const router = express.Router();

router.post("/generate", protect, generatePost);
router.get("/", protect, getPosts);
router.delete("/:id", protect, deletePost);

export default router;