const express = require('express');
const userRoutes = require('./server/user/user.route');
const feedbackRoutes = require('./server/feedback/feedback.route');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount user routes at /users
router.use('/user', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount feedback routes at /feedbacks
router.use('/feedbacks', feedbackRoutes);

module.exports = router;
