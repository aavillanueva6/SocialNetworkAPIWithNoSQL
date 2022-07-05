const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.status(200).json(thoughts))
      .catch((err) => {
        console.error(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.status(200).json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new thought
  async createThought(req, res) {
    try {
      console.log(req.body.username);
      const thoughtUser = await User.findOne({ username: req.body.username });
      console.log('thoughtUser: ', thoughtUser);
      if (!thoughtUser) {
        res.status(404).json({ message: 'No user with that username' });
      }
      const newThought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: newThought._id } }
      );
      // then((dbThoughtData) => res.status(201).json(dbThoughtData));
      res.status(201).json(newThought); //.json(err);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Update a single thought
  async updateThought(req, res) {
    try {
      const updateData = req.body;
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      await thought.updateOne(updateData);
      const updatedThought = await Thought.findOne({
        _id: req.params.thoughtId,
      });
      res.status(200).json(updatedThought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Delete a specified thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      const deletedThought = await thought.deleteOne();
      res.status(200).json(deletedThought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Add reaction to thought
  async addReaction(req, res) {
    const thoughtId = req.params.thoughtId;
    const thoughtDoc = await Thought.findById(thoughtId);
    if (!thoughtDoc) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    const username = req.body.username;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'No user with that username' });
    }

    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $addToSet: { reactions: req.body } }
      );
      return res.status(201).json(updatedThought);
    } catch {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  // Delete reaction from thought
  async deleteReaction(req, res) {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;
    const thoughtDoc = await Thought.findById(thoughtId);
    // const friendDoc = await User.findById(friend);
    if (!thoughtDoc) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    try {
      await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { reactionId: reactionId } } }
      );
      return res.status(200).send('');
    } catch {
      console.error(err);
      return res.status(500).json(err);
    }
  },
};
