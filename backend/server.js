require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const reviewRoutes = require('./routes/reviews');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.get('/', (req, res) => res.send('Book Review API'));
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI).then(()=>{
  app.listen(PORT, ()=> console.log('Server started on', PORT));
}).catch(err=>{ console.error(err); process.exit(1); });
