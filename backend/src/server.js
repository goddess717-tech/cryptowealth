import 'dotenv/config'; // MUST be first line

import mongoose from 'mongoose';
import app from './app.js';

await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('DB connection failed', err);
    process.exit(1);
  });

