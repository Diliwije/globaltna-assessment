const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob
} = require('../controllers/jobController');

// Import the authentication middleware
const { protect } = require('../middleware/authMiddleware');

// Map the controller functions to the respective HTTP methods and endpoints
router.route('/')
  .get(getJobs)            // Public route: Anyone can view the job board
  .post(protect, createJob); // Protected route: Only logged-in users can create a job request

router.route('/:id')
  .get(getJobById)                  // Public route: Anyone can view job details
  .patch(protect, updateJobStatus)  // Protected route: Only logged-in users can update status
  .delete(protect, deleteJob);      // Protected route: Only logged-in users can delete a job

module.exports = router;