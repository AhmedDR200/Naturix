const Message = require('../models/messageModel');
const asyncHandler = require('express-async-handler');


export const addMessage = asyncHandler(async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message = new Message({
      chatId,
      senderId,
      text,
    });
    try {
      const result = await message.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
});
  
export const getMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    try {
      const result = await Message.find({ chatId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
});