import { Router } from "express";
import  { getApplicationStats, getCurrentUser, updateUser } from "../controller/userController.js";
import { authorizePermissions,authenticateUser } from "../middleware/authHandler.js";
import upload from "../middleware/multerMiddleware.js";
import { validateUpdateUserInput } from "../middleware/validationHandler.js";
const router=Router();


router.get("/current-user", authenticateUser,getCurrentUser);
router.get('/admin/app-stats',[
    authenticateUser,
    authorizePermissions('admin'),
    getApplicationStats,
]);
router.patch('/update-user',upload.single('avatar'),validateUpdateUserInput,updateUser );

export default router;