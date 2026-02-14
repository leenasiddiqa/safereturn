import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// ✅ Import routes
import loginRoutes from './routes/loginroute.js';
import signupRoutes from './routes/signuproute.js';
import foundRoutes from './routes/foundroute.js';
import lostRoutes from './routes/lostroute.js';
import claimRoutes from './routes/claimroute.js';
import historyRoutes from './routes/historyroute.js';
import donationRoutes from './routes/donationroute.js';
import contactRoutes from './routes/contactroute.js';
import feedbackRoutes from './routes/feedbackroute.js';
import notificationRoutes from './routes/notificationroute.js';
import profileRoutes from './routes/profileroute.js';
import aiRoutes from "./routes/ai.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Register routes with correct prefixes
app.use('/api/login', loginRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/items/found', foundRoutes);
app.use('/api/items/lost', lostRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/profile', profileRoutes);
app.use("/api/ai", aiRoutes);
// ✅ Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});
// ✅ Debug route
app.get('/api/debug-histories', async (req, res) => {
  try {
    const History = (await import('./models/History.js')).default;
    const histories = await History.find().sort({ createdAt: -1 });
    
    res.json({
      count: histories.length,
      histories: histories
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});
// ✅ Simple MongoDB connection (deprecated options remove karo)
mongoose.connect("mongodb://127.0.0.1:27017/safereturn")
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});