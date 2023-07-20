const { selectUsers, selectUserByUsername } = require('../models/users.models');

exports.getUsers = (req, res, next) => {
  selectUsers().then((users) => {
    res.status(200).send({ users });
  });
};

exports.getUserByUserId = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username).then((user) => {
    res.status(200).send({ user });
  });
};