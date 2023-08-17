const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // GET user by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
            if(!user) {
                return res.status(404).json({message: 'No user with that ID'})
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // POST new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Updates a user (PUT)
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: req.body},
                {runValidators: true, new: true}
            );
            if(!user) {
                return res.status(404).json({message: 'No user with that ID'});
            };
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // DELETE a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({_id: req.params.userId});
            if(!user) {
                return res.status(404).json({message: 'No user with that ID'});
            }
            await Thought.deleteMany({username: {$in: user.username}});
            res.json({message: 'User deleted'})
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // POST friend to user
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: req.body}},
                {runValidators: true, new: true}
            );
            if(!user) {
                return res.status(404).json({message: 'No user with that ID'});
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE friend from user
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: req.params.friendId}},
                {runValidators: true, new: true}
            );
            if(!user) {
                return res.status(404).json({message: 'No user with that ID'})
            };
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};