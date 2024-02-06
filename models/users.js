const { Schema, model } = require('mongoose');

const UserSchema = new Schema( 
    {
        username: {
            type: String,
            unique: true, 
            required: true,
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            //NEED REGEX
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Posts'
        }],

        buddies: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
)

const Users = model('Users', UsersSchema);

module.exports = Users;