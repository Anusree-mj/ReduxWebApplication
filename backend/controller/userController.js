import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToken from '../utilitis/generateToke.js';

// auth user
const authUser = asyncHandler(async (req, res) => {    
    res.status(200).json({ message: 'Auth User' })
})

// register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

})

// logout user
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'logout User' })
})

// get user
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'get User' })
})
// update user
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'update User' })
})
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}