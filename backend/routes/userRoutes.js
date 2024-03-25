import express from 'express'
const router = express.Router();
import {
    authUser, registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);//signup user
router.post('/auth', authUser);//loginuser
router.post('/logout', logoutUser);
// router.put('/profile',protect, updateUserProfile )
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;