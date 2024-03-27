import express from 'express'
const router = express.Router();

import {
  authUser, registerUser,
  updateUserProfile, uploadImage,
  
} from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../multer/multerConfig.js';

router.post('/', registerUser);//signup user
router.post('/auth', authUser);//loginuser
router.post('/uploadImage', upload.single('file'), uploadImage);//upload image
router
  .route('/profile')
  .put(protect, updateUserProfile);

export default router;