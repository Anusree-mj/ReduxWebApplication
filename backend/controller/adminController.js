import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js';
import { generateAdminToken } from '../utilitis/token.js';

// auth user
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        generateAdminToken(res, admin._id);

        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


// logout admin
const logoutAdmin = (req, res) => {
    res.cookie('jwtAdmin', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


// get admin dashboard
const getAdminDashboard = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// update user
// const updateUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.body._id);

//     if (user) {
//         user.name = req.body.name || user.name;
//         user.email = req.body.email || user.email;

//         if (req.body.password) {
//             user.password = req.body.password;
//         }

//         const updatedUser = await user.save();

//         res.json({
//             _id: updatedUser._id,
//             name: updatedUser.name,
//             email: updatedUser.email,
//         });
//     } else {
//         res.status(404);
//         throw new Error('User not found');
//     }
// });
export {
    authAdmin,
    logoutAdmin,
    getAdminDashboard,
}