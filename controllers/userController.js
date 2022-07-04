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
      .then((dbUserData) => res.status(200).json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // Update a single user
  updateUser(req, res) {
    return res.status(200).send('');
  },
  // Delete a specified user
  deleteUser(req, res) {
    return res.status(200).send('');
  },
  // Add friend to user
  addFriend(req, res) {
    return res.status(200).send('');
  },
  // Delete friend from user
  deleteFriend(req, res) {
    return res.status(200).send('');
  },
};
