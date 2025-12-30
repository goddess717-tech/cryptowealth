import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://cryptowealth-silk.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});


export default app;
