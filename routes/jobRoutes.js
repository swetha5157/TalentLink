import {Router} from 'express';
const router=Router();

import {
    getAllJobs,
    getJob,
    createJob,
    editJob,
    deleteJob
} from '../controller/jobController.js'
import { validateJobInput } from '../middleware/validationHandler.js';
router.route('/').get(getAllJobs).post(validateJobInput,createJob)  ;
router
  .route("/:id")
  .get(getJob)
  .patch(validateJobInput,editJob)
  .delete(deleteJob);

export default router;