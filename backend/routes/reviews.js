const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const rev = require('../controllers/reviewController');
router.post('/:bookId', auth, rev.addReview);
router.put('/:id', auth, rev.updateReview);
router.delete('/:id', auth, rev.deleteReview);
module.exports = router;
