const { Posts, Users } = require('../models');

const postController = {
    
    createPost({params, body}, res) {
        Posts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.ueserId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({message: 'No post with this ID'});
                return;
            }
            res.json(dbPostData)
        })
        .catch(err => res.json(err));
    },

    fetchAllPosts(req, res) {
        Posts.find({})
        .populate({path: 'reactions', select: '__v'}
        .selevt('__v')
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }));
    },
    getPostById({params}, res) {
        Posts.findOne({ _id: params.id }
        .populate({path: 'reactions', select: '__v'})
        .slect('__v')
        .then(dbPostData => {
            if(!dbPostData) {
                res.status(404).json({message: 'No post with this ID'});
                return;
            }
            res.json(dbPostData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        }));
    },

    updatePost({params, body}, res) {
        Posts.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '__v'})
        .select('__v')
        .then(dbPostData => {
            if (!dbPostData => {
                res.status(404).json({message: 'No posts with this ID'});
                return;
            }
            res.json(dbpostData);
        })
        .catch(err => res.json(err));
    },

    deletePost({params}, res) {
        Posts.findOneAndDelete({ _id: params.id })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({message: 'No post with this ID'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => res.status(400).json(err));
    },

    addReaction({params, body}, res) {
        Posts.findOneAndUpdate({_id: params.postId}, {$push: {reactions: body}}, {new:true, runValidators: true})
        .populate({path: 'reactions', select: '__v'})
        .select('__v')
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({message: 'No post with this ID'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteReaction({params}, res) {
        Posts.findOneAndUpdate({_id: params.postId}, {$pull: {reactions: {reactionID: params.reactionId }}}, {new: true})
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({message: 'No post with this ID'});
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = postController;