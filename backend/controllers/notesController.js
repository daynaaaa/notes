const User = require('../models/User');
const Note = require('../models/Note');
// so u dont need try-catch blocks to save, delete, and find data from MonoDB
const asyncHandler = require('express-async-handler');

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean()
    // if no notes
    if (!notes?.length) {
        return res.status(400).json({ message: "No notes found"});
    }

    // add username to each note before sending response (promise.all)
    // map: for each note, find the user then return the note and username
    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec()
        return { ...note, username: user.username }
    }))


    res.json(users);
})

// @desc Create new note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const{ user, title, text } = req.body;

    // confirming data (reject)
    if(!user || !title || !text) {
        // will be handled by asynch errorhandler, but we also want errors to be sent to frontend
        return res.status(400).json({ message: 'All fields are required'});
    }

    // check for duplicate title
    // lean bc ur not gonna call save
    // if ur using asynch await and need a promise back, call exec (to get error reporting)
    const duplicate = await Note.findOne({ title }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate note title'});
    }
    
    // create and store new note
    const note = await Note.create({ user, title, text });

    // note created
    if(note) {
        //no return bc we're at the end
        res.status(201).json({message: `New note created`});
    } else {
        res.status(400).json({message: `Invalid note data received`});
    }
})

// @desc Update note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    // bring some more data
    const { id, user, title, text, completed } = req.body;

    //confirm data
    if (!id || !user || !title || !text || typeof copleted !== 'boolean') {
       return res.status(400).json({ message: 'All fields are required' })
        //return res.status(400).json({ message: `${id}` })
    }

    // .exec bc passing new value, also need to return the promise
    // no calling lean bc we need this to be a mongoose doc that has 'save' and other methods attached to it
    const note = await Note.findById(id).exec();
    // note dne
    if (!note) {
        return res.status(400).json({ message: 'Note not found'});
    }

    // check for duplicate
    const duplicate = await Note.findOne({ title }).lean().exec()
    // allow updates to original note
    // its only a duplicate if the id is nnot the same as the user ur currently working with
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate note title'});
    }

    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save();
    // if there is a problem, it would be solved by asynch handler

    res.json(`'${updatedNote.title}' updated`)
})

// @desc Delete note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    // destructure id from req body
    const { id } = req.body;

    if (!id ) {
        return res.status(400).json({ message: `Note ID Required`});
    }

    // note exists
    const note = await Note.findOne({user: id }).lean().exec();
    if (!note) {
        return res.status(400).json({message: 'Note not found'});
    }

    const result = await note.deleteOne();

    const reply = `Note ${result.title} with ID ${result._id} deleted`;

    res.json(reply);
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}