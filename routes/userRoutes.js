import { Router } from "express";
import  { getApplicationStats, getCurrentUser, updateUser } from "../controller/userController.js";
import { authorizePermissions,authenticateUser } from "../middleware/authHandler.js";
const router=Router();


router.get("/current-user", authenticateUser,getCurrentUser);
router.get('/admin/app-stats',[
    authenticateUser,
    authorizePermissions('admin'),
    getApplicationStats,
]);
router.patch('/update-user',updateUser );

export default router;