const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [
    {
      username: 'SeedUserOne',
      email: 'one@seed.com',
    },
    {
      username: 'SeedUserTwo',
      email: 'two@seed.com',
    },
    {
      username: 'SeedUserThree',
      email: 'three@seed.com',
    },
  ];

  await User.collection.insertMany(users);
  const pulledUsers = await User.find();
  const thoughts = [
    {
      thoughtText: `this is the first user's first thought`,
      username: pulledUsers[0].username,
    },
    {
      thoughtText: `this is the first user's second thought`,
      username: pulledUsers[0].username,
    },
    {
      thoughtText: `this is the second user's thought`,
      username: pulledUsers[1].username,
    },
    {
      thoughtText: `this is the third user's thought`,
      username: pulledUsers[2].username,
    },
  ];
  await Thought.collection.insertMany(thoughts);
  const pulledThoughts = await Thought.find();

  for (element of pulledThoughts) {
    thoughtUsername = element.username;
    const thoughtUser = await User.findOneAndUpdate(
      { username: element.username },
      { $addToSet: { thoughts: element._id } }
    );
  }

  // console.table(users);
  // console.table(thoughts);
  console.info('Seeding complete! 🌱');

  process.exit(0);
});
