const Book = require('../models/Book');
const Review = require('../models/Review');
exports.createBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const book = await Book.create({ title, author, description, genre, year, addedBy: req.user._id });
    res.status(201).json(book);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.listBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const total = await Book.countDocuments();
    const books = await Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    const bookIds = books.map(b => b._id);
    const agg = await Review.aggregate([
      { $match: { book: { $in: bookIds } } },
      { $group: { _id: '$book', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
    ]);
    const map = {};
    agg.forEach(a => { map[a._id.toString()] = { avgRating: a.avgRating, count: a.count }; });
    const booksWithRatings = books.map(b => ({ ...b, averageRating: map[b._id.toString()]?.avgRating || 0, reviewCount: map[b._id.toString()]?.count || 0 }));
    res.json({ page, totalPages: Math.ceil(total / limit), total, books: booksWithRatings });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name email').lean();
    if (!book) return res.status(404).json({ message: 'Not found' });
    const reviews = await Review.find({ book: book._id }).populate('user', 'name').sort({ createdAt: -1 }).lean();
    const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;
    res.json({ ...book, reviews, averageRating: avg, reviewCount: reviews.length });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    if (book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    const fields = ['title','author','description','genre','year'];
    fields.forEach(f => { if (req.body[f] !== undefined) book[f] = req.body[f]; });
    await book.save();
    res.json(book);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Not found' });
    if (book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await Review.deleteMany({ book: book._id });
    await book.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
