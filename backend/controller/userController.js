import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import { generateToken } from '../utilitis/token.js';

// auth user
const authUser = asyncHandler(async (req, res) => {
    console.log('entered in login backend')
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            status: 'ok',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            },
        });
    } else {
        res.status(401).json({ status: 'nok', message: 'Invalid email or password' });
    }
});


// upload image
const uploadImage = asyncHandler(async (req, res) => {
    console.log('req.fileeee', req.file)
    const relativeImagePath = req.file.path.replace(/\\/g, '/').split('/public')[1];
    const imageUrl = `${req.protocol}://${req.get('host')}/public${relativeImagePath}`;
    console.log('imageurl', imageUrl)
    res.status(200).json({ imageUrl });
})

// register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, image } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(401).json({ status: 'nok', message: 'User already exists' });
    }
    const user = await User.create({
        name,
        email,
        password,
        image
    });

    if (user) {
        generateToken(res, user._id);
        console.log('userInfo', user)
        res.status(201).json({
            status: 'ok',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            }
        })
    } else {
        res.status(400).json({ status: 'nok', message: 'Error Occured' });
    }

})

// logout user
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


// get user
const getUserProfile = asyncHandler(async (req, res) => {
    console.log('req in getuserprofile', req)
    const user = await User.findById(req.user._id);
    console.log(user, 'user in get userProgile')
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// update user
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    uploadImage
}