const express = require('express');
const ChatMessage = require('../models/ChatMessage');
const { protect } = require('../middlewares/auth');
const { chatRespond } = require('../services/mlService');
const { saveRecord, listRecords } = require('../services/storage');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message is required' });

  await saveRecord(ChatMessage, { userId: req.user.id, role: 'user', content: message });
  const assistantReply = chatRespond(message);
  const savedAssistant = await saveRecord(ChatMessage, { userId: req.user.id, role: 'assistant', content: assistantReply });
  return res.json({ reply: assistantReply, messageId: savedAssistant._id, source: 'Rule-guided AI assistant simulation' });
});

router.get('/', protect, async (req, res) => {
  const messages = await listRecords(ChatMessage, { userId: req.user.id }, 100);
  return res.json({ messages: messages.reverse() });
});

module.exports = router;
