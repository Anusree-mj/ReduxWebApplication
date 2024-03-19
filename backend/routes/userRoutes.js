import express from 'express'
const router = express.Router();
import {
    authUser, registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controller/userController.js';


router.post('/', registerUser);//signup user
router.post('/auth', authUser);//loginuser
router.post('/logout', logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export default router;