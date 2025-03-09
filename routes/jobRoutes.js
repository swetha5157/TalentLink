import {Router} from 'express';
const router=Router();

import {
    getAllJobs,
    getJob,
    createJob,
    editJob,
    deleteJob
} from '../controller/jobController.js'
import { validateJobInput,validateIdParam } from '../middleware/validationHandler.js';
router.route('/').get(getAllJobs).post(validateJobInput,validateIdParam,createJob)  ;
router
  .route("/:id")
  .get(validateIdParam,getJob)
  .patch(validateJobInput,validateIdParam,editJob)
  .delete(validateIdParam,deleteJob);

export default router;