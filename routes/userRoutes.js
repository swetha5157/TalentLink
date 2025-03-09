import { Router } from "express";
import {login,register,logout} from "../controller/authController.js"
import {validateLoginInput, validateRegisterInput} from "../middleware/validationHandler.js"
const router=Router();


router.post('/register',validateRegisterInput,register);
router.post('/login',validateLoginInput,login);
router.get("/logout", logout);

export default router;