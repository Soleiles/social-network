const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // GET thought by ID
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // POST new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            )
            if (!user) {
                return res.status(404).json({
                    message: 'No user with that ID',
                })
            }
            res.json('New thought created');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // Update thought (PUT)
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!thought) {
                return res.status(404).json({message: 'No thought with that ID'});
            };
            res.json(thought);
        } catch (err){
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE thought
    async deleteThought (req, res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId});
            if(!thought) {
                return res.status(404).json({message: 'No thought with that ID'});
            }
            const user = await User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
            if(!user) {
                return res.status(404).json({message: 'No user with that ID'});
            }
            res.json({message: 'Thought deleted'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}
