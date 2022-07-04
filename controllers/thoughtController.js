const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then((users) => res.status(200).json(users))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    return res.status(200).send('');
  },
  createThought(req, res) {
    return res.status(200).send('');
  },
  updateThought(req, res) {
    return res.status(200).send('');
  },
  deleteThought(req, res) {
    return res.status(200).send('');
  },
  addReaction(req, res) {
    return res.status(200).send('');
  },
  deleteReaction(req, res) {
    return res.status(200).send('');
  },
};
