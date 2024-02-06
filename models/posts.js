//need Mongoose, Moment
const { Schema, model, Types } = required('mongoose');
const moment = require('moment');

const ReactionsSchem = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },

        reactionMain: {
            type: String,
            required: true,
            maxlength: 350
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => moment(createdAtValue).format('MM DD, YYYY [at] hh:mm a')
        }
    },
    {
        toJSON: {
            geeters: true
        }
    }
);

const PostSchema = mew Schema(
    {
        postText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 350
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => moment(createdAtValue).format('MM DD, YYYY [at] hh:mm a')
        },

        username: {
            type: String,
            required: true
        },

     //need reactioschema to validate the data

     {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
     }
);

module.exports = Posts;
