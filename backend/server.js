const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/filter_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    filters: [{
        name: String,
        value: mongoose.Schema.Types.Mixed,
        timestamp: { type: Date, default: Date.now }
    }]
});

const User = mongoose.model('User', userSchema);

// Routes
// Save filter
app.post('/api/filters', async (req, res) => {
    try {
        const { username, filter } = req.body;
        
        let user = await User.findOne({ username });
        if (!user) {
            user = new User({ username, filters: [] });
        }
        
        user.filters.push(filter);
        await user.save();
        
        res.json({ success: true, message: 'Filter saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get filters for a user
app.get('/api/filters/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.json({ filters: [] });
        }
        res.json({ filters: user.filters });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 