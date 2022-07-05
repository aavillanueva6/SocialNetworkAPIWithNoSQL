const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find({})
      .then((users) => res.status(200).json(users))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.status(200).json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.status(201).json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // Update a single user
  async updateUser(req, res) {
    try {
      const updateData = req.body;
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      await user.updateOne(updateData);
      const updatedUser = await User.findOne({ _id: req.params.userId });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a specified user
  async deleteUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      let deletedData = [];
      const deletedThoughts = await Thought.deleteMany({
        username: user.username,
      });
      const deletedUser = await user.deleteOne();
      deletedData.push(deletedThoughts, deletedUser);
      res.status(200).json(deletedData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Add friend to user
  async addFriend(req, res) {
    const user = req.params.userId;
    const friend = req.params.friendId;
    const userDoc = await User.findById(user);
    const friendDoc = await User.findById(friend);
    if (!userDoc || !friendDoc) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    try {
      await User.findOneAndUpdate(
        { _id: user },
        { $addToSet: { friends: friend } }
      );
      return res.status(201).send('');
    } catch {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // Delete friend from user
  async deleteFriend(req, res) {
    const user = req.params.userId;
    const friend = req.params.friendId;
    const userDoc = await User.findById(user);
    const friendDoc = await User.findById(friend);
    if (!userDoc || !friendDoc) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    try {
      await User.findOneAndUpdate(
        { _id: user },
        { $pull: { friends: friend } }
      );
      return res.status(200).send('');
    } catch {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
