import {Router} from 'express';
const router=Router();
import {
    getAllJobs,
    getJob,
    createJob,
    editJob,
    deleteJob,showStats
} from '../controller/jobController.js'
import { validateJobInput,validateIdParam } from '../middleware/validationHandler.js';
import { checkForTestUsers } from '../middleware/authHandler.js';

router.route("/").get(getAllJobs).post(checkForTestUsers,validateJobInput, createJob);

//express reads from top to bottom
//so write stats router before /:id
router.route('/stats').get(showStats);
router
  .route("/:id")
  .get(validateIdParam,getJob)
  .patch(checkForTestUsers,validateJobInput,validateIdParam,editJob)
  .delete(checkForTestUsers,validateIdParam,deleteJob);

export default router;