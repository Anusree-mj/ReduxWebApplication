import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';
import { generateAdminToken } from '../utilitis/token.js';

// auth user
const authAdmin = asyncHandler(async (req, res) => {
    console.log('entered in admin controller')
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (admin) {
        console.log('email found')
        generateAdminToken(res, admin._id);
        res.status(200).json({
            status: 'ok',
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });

    } else {
        res.status(401).json({ status: 'nok', message: 'Invalid email or password' });
    }
});


// get admin dashboard
const getAdminDashboard = asyncHandler(async (req, res) => {
    console.log('entered in controller')
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
        const users = await User.find({}, { name: 1, email: 1, image: 1 });
        console.log('users found in dashboard controller fnctn', users)
        res.status(200).json({
            status: 'ok',
            users: users
        });


    } else {
        res.status(401).json({ status: 'nok', message: 'Admin not found' });
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
    getAdminDashboard,
}