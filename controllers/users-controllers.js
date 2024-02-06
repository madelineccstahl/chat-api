const { Users } = require('../models');

const usersControl = {
    createUsers({body}, res) {
        Users.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    getEveryUser(req, res) {
        Users.find({})
        .populate({path: 'posts', select: '__v'})
        .populate({path: 'buddies', select: '__v'})
        .select('__v')
        .then(dbUserData => res.json(debUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getUserByID({params}, res) {
        Users.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '__v'})
        .populate({path: 'buddies', select: '__v'})
        .select('__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user with this ID'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    updateUser({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },
    
    addBud({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.buddyId}}, {new: true})
        .populate({path: 'buddies', select: ('__v')})
        .select('__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
}