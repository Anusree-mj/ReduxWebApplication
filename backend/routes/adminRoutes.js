import express from 'express'
const router = express.Router();
import { authAdmin,  getAdminDashboard } from '../controller/adminController.js'
import { protectAdmin } from '../middleware/adminAuthMiddleware.js';


router.post('/login', authAdmin);//login admin
router.get('/', protectAdmin, getAdminDashboard);



export default router;