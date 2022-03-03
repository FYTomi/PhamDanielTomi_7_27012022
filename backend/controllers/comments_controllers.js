//Importations

const { Comments } = require('../models')

//Middleware pour afficher les commentaires d'un post

exports.displayPostComments = async(req, res) =>{
    const postId = req.params.id
    const showComments = await Comments.findAll({
        where: { PostId: postId}
    })
    res.json(showComments)
};

//Middleware pour ajouter un commentaire

exports.addComment = async(req,res) =>{
    const comment= req.body
    const username = req.user.username
    comment.username = username
    const newComment = await Comments.create(comment)
    res.json(newComment)
};

//Middleware pour supprimer un commentaire

exports.deleteComment = async(req,res) => {
    const commentId = req.params.commentId
    await Comments.destroy({
        where: {id: commentId}
    })
    res.json('Commentaire supprimé')
}