const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/freelancer_site';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Message = mongoose.model('Message', MessageSchema);

// Routes
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).send('All fields are required.');
        }

        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        res.status(200).send('Message received successfully!');
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send('Internal server error.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});