const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

function formatDate(createdAt) {
    return createdAt.toLocaleDateString("en-US", {
        day: "2-digit",
        year: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
    });
};

module.exports = reactionSchema;