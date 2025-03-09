import { Router } from "express";
import {login,register} from "../controller/userController.js"
import {validateLoginInput, validateRegisterInput} from "../middleware/validationHandler.js"
const router=Router();


router.post('/register',validateRegisterInput,register);
router.post('/login',validateLoginInput,login);

export default router;