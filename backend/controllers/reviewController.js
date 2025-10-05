const Review = require('../models/Review');
const Book = require('../models/Book');
exports.addReview = async (req, res) => {
  try {
    const { rating, text } = req.body;
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    const review = await Review.create({ book: bookId, user: req.user._id, rating, text });
    res.status(201).json(review);
  } catch (err) { if (err.code === 11000) return res.status(400).json({ message: 'You have already reviewed this book' }); res.status(500).json({ message: err.message }); }
};
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Not found' });
    if (review.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    if (req.body.rating) review.rating = req.body.rating;
    if (req.body.text !== undefined) review.text = req.body.text;
    await review.save();
    res.json(review);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Not found' });
    if (review.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await review.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
