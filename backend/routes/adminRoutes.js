import express from 'express'
const router = express.Router();
import {
    authAdmin,
    getAdminDashboard,
    deleteUser,
    editUser,addUser
} from '../controller/adminController.js'
import { protectAdmin } from '../middleware/adminAuthMiddleware.js';


router.post('/login', authAdmin);//login admin
router.get('/', protectAdmin, getAdminDashboard);
router.post('/addUser', protectAdmin, addUser);
router
    .route('/user/:userId')
    .delete(protectAdmin, deleteUser)
    .put(protectAdmin, editUser)
    // .post(protectAdmin, addUser);




export default router;