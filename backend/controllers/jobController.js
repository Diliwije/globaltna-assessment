const JobRequest = require('../models/JobRequest');

// Fetch all job requests with optional filtering, searching, and user population
exports.getJobs = async (req, res, next) => {
  try {
    const { category, status, search } = req.query;
    const filter = {};
    
    // Apply filters if they exist in the query parameters
    if (category) filter.category = category;
    if (status) filter.status = status;

    // Apply search across title and description (case-insensitive)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch jobs, sort by newest first, and populate the creator's name
    const jobs = await JobRequest.find(filter)
      .sort({ createdAt: -1 })
      .populate('user', 'name'); // Dynamically fetches only the 'name' field of the referenced User
      
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// Fetch a single job request by its ID with user population
exports.getJobById = async (req, res, next) => {
  try {
    // Fetch single job and populate the creator's name
    const job = await JobRequest.findById(req.params.id).populate('user', 'name');
    if (!job) {
      return res.status(404).json({ error: 'Job request not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    // Handle invalid MongoDB ObjectId format
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Job request not found' });
    }
    next(error);
  }
};

// Create a new job request and bind it to the authenticated user
exports.createJob = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Basic input validation
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    // Structure the job data and inject the logged-in user's ID from protect middleware
    const jobData = {
      ...req.body,
      user: req.user.id // Injected automatically by authMiddleware protect function
    };

    const newJob = await JobRequest.create(jobData);
    res.status(201).json(newJob);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    next(error);
  }
};

// Update only the status of a job request
exports.updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required to update' });
    }

    // Validate enum values
    const validStatuses = ['Open', 'In Progress', 'Closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const job = await JobRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ error: 'Job request not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Job request not found' });
    }
    next(error);
  }
};

// Delete a job request
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job request not found' });
    }

    res.status(200).json({ message: 'Job request deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Job request not found' });
    }
    next(error);
  }
};