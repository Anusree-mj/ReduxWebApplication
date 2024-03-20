import express from 'express'
const router = express.Router();
import { authAdmin, logoutAdmin, getAdminDashboard } from '../controller/adminController.js'
import { protectAdmin } from '../middleware/adminAuthMiddleware.js';


router.post('/login', authAdmin);//login admin
router.post('/logout', logoutAdmin);
router.get('/dashboard', protectAdmin, getAdminDashboard);



export default router;