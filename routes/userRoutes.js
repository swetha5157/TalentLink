import { Router } from "express";
import  { getApplicationStats, getCurrentUser, updateUser } from "../controller/userController.js";
import { authorizePermissions } from "../middleware/authHandler.js";
const router=Router();


router.get('/current-user',getCurrentUser);
router.get('/admin/app-stats',[
    authorizePermissions('admin'),
    getApplicationStats,
]);
router.patch('/update-user',updateUser );

export default router;