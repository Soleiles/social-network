const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { thoughts, users } = require('./data');

// IF error
connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected to MongoDB');

    // Drops existing collections if they exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete');
    process.exit(0);
});