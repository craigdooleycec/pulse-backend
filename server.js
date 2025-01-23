const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let polls = []; // In-memory storage for now

// Get all polls
app.get('/polls', (req, res) => res.json(polls));

// Get a poll by ID
app.get('/polls/:id', (req, res) => {
    const poll = polls.find(p => p.id == req.params.id);
    poll ? res.json(poll) : res.status(404).json({ error: 'Poll not found' });
});

// Create a poll
app.post('/polls', (req, res) => {
    const newPoll = req.body;
    polls.push(newPoll);
    res.status(201).json(newPoll);
});

// Update poll results
app.post('/results', (req, res) => {
    const { id, votes } = req.body;
    const poll = polls.find(p => p.id == id);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });
    poll.votes = votes;
    res.status(200).json({ message: 'Results updated' });
});

// Delete a poll
app.delete('/polls/:id', (req, res) => {
    polls = polls.filter(p => p.id != req.params.id);
    res.status(204).send();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
