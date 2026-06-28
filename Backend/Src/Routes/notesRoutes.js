import express from "express";
import { getAllNotes,updateNote,deleteNote, createNote ,getNoteByID } from "../Controller/notesController.js";

const router = express.Router();

router.get("/",getAllNotes)

router.get("/:id",getNoteByID)

router.post("/create",createNote);

router.put("/update/:id",updateNote);
  
 
router.delete("/delete/:id",deleteNote);

export default router;
 