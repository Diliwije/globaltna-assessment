// routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob
} = require('../controllers/jobController');

// Map the controller functions to the respective HTTP methods and endpoints
router.route('/')
  .get(getJobs)
  .post(createJob);

router.route('/:id')
  .get(getJobById)
  .patch(updateJobStatus)
  .delete(deleteJob);

module.exports = router;