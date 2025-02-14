const User = require('../models/User');
// this is the user's controller, but u may need to refer to the note model
const Note = require('../models/Note');
// so u dont need try-catch blocks to save, delete, and find data from MonoDB
const asyncHandler = require('express-async-handler');
// to hash the password before it is saved
const bcrypt = require('bcrypt')


// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    // if no users
    if (!users?.length) {
        return res.status(400).json({ message: "No users found"});
    }
    res.json(users);
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const{ username, password, roles } = req.body;

    // confirming data (reject)
    if(!username || !password || !Array.isArray(roles) || !roles.length) {
        // will be handled by asynch errorhandler, but we also want errors to be sent to frontend
        return res.status(400).json({ message: 'All fields are required'});
    }

    // check for duplicates
    // lean bc ur not gonna call save
    // if ur using asynch await and need a promise back, call exec (to get error reporting)
    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate username'});
    }

    // hash password
    const hashedPwd = await bcrypt.hash(password, 10) // 10 salt rounds

    // object that has a username, password, roles
    const userObject = { username, "password": hashedPwd, roles};
    
    // create and store new user
    const user = await User.create(userObject);

    // user created
    if(user) {
        //no return bc we're at the end
        res.status(201).json({message: `New user ${username} created`});
    } else {
        res.status(400).json({message: `Invalid user data received`});
    }
})

// @desc Update user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    // bring some more data
    const { id, username, roles, active, password } = req.body;

    //confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
       return res.status(400).json({ message: 'All fields except password are required' })
        //return res.status(400).json({ message: `${id}` })
    }

    // .exec bc passing new value, also need to return the promise
    // no calling lean bc we need this to be a mongoose doc that has 'save' and other methods attached to it
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: 'User not found'});
    }

    // check for duplicate
    const duplicate = await User.findOne({ username }).lean().exec()
    // allow updates to original user
    // its only a duplicate if the id is nnot the same as the user ur currently working with
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Duplicate username'});
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    // dont always require a password, but if they do want to change
    if (password) {
        // hash password
        user.password = await bcrypt.hash(password, 10); // salt rounds
    }

    const updatedUser = await user.save();
    // if there is a problem, it would be solved by asynch handler

    res.json({message: `${updatedUser.username} updated`})
})

// @desc Delete user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    // destructure id from req body
    const { id } = req.body;

    if (!id ) {
        return res.status(400).json({ message: `User ID Required`});
    }

    // dont want to delete a user with notes assigned
    const note = await Note.findOne({user: id }).lean().exec();
    // ? optional chain, call a method which may not exist, if not, its undefined/null and doesnt throw an error
    // here, the user may or may not have a note
    // note will be null if doesnt find anythig
    if (note) {
        return res.status(400).json({message: 'User has assigned notes'});
    }

    // define user
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // if there is a user, result receives a full user object
    const result = await user.deleteOne();
    // now the user is deleted but result holds the user's information

    const reply = `Username ${result.username} with ID ${result._id} deleted`;

    res.json(reply);
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}