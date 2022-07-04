const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          headCount: await headCount(),
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    return res.status(200);
  },
  createThought(req, res) {
    return res.status(200);
  },
  updateThought(req, res) {
    return res.status(200);
  },
  deleteThought(req, res) {
    return res.status(200);
  },
  addReaction(req, res) {
    return res.status(200);
  },
  deleteReaction(req, res) {
    return res.status(200);
  },
};
