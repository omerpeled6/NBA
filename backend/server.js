import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import likeRoutes from './routes/likeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import basketRoutes from './routes/basketRoutes.js';
import dreamTeamRoutes from './routes/dreamTeamRoutes.js';
import myPlayerRoutes from './routes/myPlayerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my app' });
});

app.use('/api/user', userRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/dreamteam', dreamTeamRoutes);
app.use('/api/myplayer', myPlayerRoutes);

mongoose
  .connect(process.env.MONGOURI, { dbName: 'demo_db' })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to db & listening on port', PORT);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
