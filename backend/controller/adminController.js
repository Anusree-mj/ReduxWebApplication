import asyncHandler from 'express-async-handler'
import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';
import { generateAdminToken } from '../utilitis/token.js';

// auth user
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (admin) {
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
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
        const users = await User.find({});
        res.status(200).json({
            status: 'ok',
            users: users
        });


    } else {
        res.status(401).json({ status: 'nok', message: 'Admin not found' });
    }
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);
    if (admin) {
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(userId, { isBlocked: true });
        if (user) {
            res.status(200).json({
                status: 'ok',
                message: 'User blocked succesfully'
            });
        } else {
            console.log('User not found')
        }

    } else {
        res.status(401).json({ status: 'nok', message: 'Admin not found' });
    }
});

// edit user
const editUser = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);
    if (admin) {
        const userId = req.params.userId;
        const user = await User.findByIdAndUpdate(userId, { isBlocked: false });
        if (user) {
            res.status(200).json({
                status: 'ok',
                message: 'User Unblocked succesfully'
            });
        } else {
            console.log('User not found')
        }

    } else {
        res.status(401).json({ status: 'nok', message: 'Admin not found' });
    }
});

// add user
const addUser = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);
    console.log('entered in adduser controller')
    if (admin) {
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
            res.status(201).json({
                status: 'ok',
            })
        } else {
            res.status(400).json({ status: 'nok', message: 'Error Occured' });
        }
    } else {
        res.status(401).json({ status: 'nok', message: 'Admin not found' });
    }
})


export {
    authAdmin,
    getAdminDashboard,
    deleteUser,
    editUser,
    addUser
}