import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import Response from './models/Response.js';
import User from './models/User.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/responses', async (req, res) => {
  try {
    const { userId, sectionId, answers } = req.body;
    const response = new Response({
      userId,
      sectionId,
      answers,
    });
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ error: 'Error saving response' });
  }
});

app.post('/api/goals', async (req, res) => {
  try {
    const { userId, goal } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.goals.push({
      text: goal,
      completed: false,
      createdAt: new Date(),
    });
    await user.save();
    res.status(201).json(user.goals);
  } catch (error) {
    console.error('Error saving goal:', error);
    res.status(500).json({ error: 'Error saving goal' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { userId, profile, message } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    let chatProfile = user.chatHistory.find(ch => ch.profile === profile);
    if (!chatProfile) {
      chatProfile = { profile, messages: [] };
      user.chatHistory.push(chatProfile);
    }
    
    chatProfile.messages.push({
      role: message.role,
      content: message.content,
      timestamp: new Date(),
    });
    
    await user.save();
    res.status(201).json(chatProfile);
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).json({ error: 'Error saving chat message' });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
