import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes)
    }
    catch (err) {
        console.error("failed to get notes")
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const getNoteByID = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ messafe: "note Not Found" })
        res.json(note)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const createNote = async (req, res) => {
    try {
        console.log(req.body)
        const { title, content } = req.body ?? {};
        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updateNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updateNote);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
}

export const deleteNote = async (req, res) => {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
        if (!deleteNote) return res.status(404).json("Note not found");
        res.status(200).json("note deleted sucessfully")
    }
    catch (err) {
        res.status(500).json(err.message)
    }
};
