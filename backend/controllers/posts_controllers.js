//Imporations
const { Posts, Likes } = require('../models');
const { post } = require('../routes/user_routes');


//Middleware pour afficher tous les posts et les affiches du plus récent au plus ancient

exports.displayPosts = async(req,res) => {
    const getPosts = await Posts.findAll({ 
		include: [Likes],
		order: [['id', 'DESC']],
	})

	// Trouve tout les likes où UserId est celui qui est connecté
	const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } })

	res.json({ getPosts, likedPosts })
};

//Middleware pour afficher un post

exports.displayPost = async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id)
    res.json(post)
};

//Middleware pour afficher les posts d'un utilisateur

exports.displayUserPosts = async (req, res) => {
    const id = req.param.id
    const postsOfUser = await Posts.findAll({
        where : {UserId: id},
        order:[['id', 'DESC']],
    })
    res.status(200).json(postsOfUser)
};

//Middleware récupérant les données du formulaire pour un nouveau post

exports.createPost = async (req, res) => {
    post = req.body
    post.username = req.user.username
    post.UserId = req.user.id
    await Posts.create(post)
        .then((result) =>{
            post.postId = result.id
            module.exports.post = post.postId
        })
        res.status(201).json(post)
};

//Middleware pour modifier le titre d'un post

exports.changePostTitle = async (req,res) => {
    const { newTitle, id } = req.body
    await Posts.update({ title: newTitle}, {where: {id:id} })
    res.json(newTitle);
};

//Middleware pour modifier le texte d'un post

exports.changePostText = async (req,res) => {
    const { newText, id } = req.body
    await Posts.update( {postText: new Text}, {where: {id:id} });
    res.json(newText);
};

//Middleware pour supprimer un post

exports.deletePost = async (req,res) => {
    const postId = req.params.postId
    await Posts.destroy({
        where:{id:postId}
    })
    res.json('Le post a été supprimé')
};