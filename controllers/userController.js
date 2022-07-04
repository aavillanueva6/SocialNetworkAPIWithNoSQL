const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    return res.status(200);
  },
  createUser(req, res) {
    return res.status(200);
  },
  updateUser(req, res) {
    return res.status(200);
  },
  deleteUser(req, res) {
    return res.status(200);
  },
  addFriend(req, res) {
    return res.status(200);
  },
  deleteFriend(req, res) {
    return res.status(200);
  },
};
