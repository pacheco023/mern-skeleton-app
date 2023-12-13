import Post from '../models/post.model';
import merge from 'lodash/merge';
import errorHandler from '../helpers/dbErrorHandler';
import formidable from 'formidable';

const create = async (req, res) => {
    const post = new Post(req.body);
    try {
        await post.save();
        return res.status(200).json({
            message: 'Successfully signed up!'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
} ;

const list = async (req, res) => {
    try {
        let posts = await Post.find().select('name updated created');
        res.json(posts);
    } catch (err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        })
    }
};

const postById = async (req, res, next, id) => {
    try {
        let post = await Post.findById({_id: id})
        .populate('likes', '_id description')
        .populate('comment', '_id text')
        .exec();

        if(!post) {
            return res.status(400).json({
                error: 'Post not found'
            });
        }
        req.profile = post;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Could not retrieve post"
        });
    }
};

const read = (req, res) => {
    req.profile.salt = undefined;
    req.name = 'ss';
    return res.json(req.profile);
};

const update = async (req, res) => {
    const from = new formidable.IncomingForm();
    from.keepExtension = true;
    from.parse(req,async(err,fields,files) => {
        try {
            if(err){
                return res.status(400).json({
                    error: 'Photo could not be uploaded'
                });
            }
            let post = req.profile;
            post = extend(post, fields);
            post.update = Date.now();

            if(files.photo){
                post.photo.data = fs.readFileSyns(files.photo.filepath);
                post.photo.contentType = files.photo.type;
            }
            await post.save();
            post.salt = "";

            res.json({post});
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage('error', err)
            });
        }
    });
};

const remove = async (req, res, next) => {
    try {
        console.log('deleted');
        let post = req.profile;
        console.log('post to remove', post);
        let deletedPost = await post.deleteOne();
        deletedPost.hashed_password = '';
        deletedPost.salt = '';
        res.json(deletedPost);
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const addlike = async (req,res) => {
    try { 
        const result = await Post.findByIdAndUpdate( 
        req.body.postId,
        {$push:{likes:req.body.userId}},
        {new: true}
  )
  .populate('like', '_id description')
  .populate('comment', '_id text')
  .exec();
  result.salt = undefined;
  res.json(result);
}catch (err){
    return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
    });
}
};

const defaultPhoto = (req,res)=>{
    return res.sendFile(`${process.cwd()}${defaultlmage}`);
};

  const addcomment = async (req,res, next) => {
    try{
      await Post.findByIdAndUpdate(
        req.body.postId,
        {$push:{Comment:req.body.userId}});
        next();
    }catch(err){
      return res.status(400).json({
        error:errorHandler.getErrorMessage(err)
      });
    }
  };

  const removelike = async (req,res)=> {
    try{
      const result = await Post.findByIdAndUpdate(
        req.body,postId,
        {$pull: {likes:req.body.userId}},
        {new:true}
      )
      .populate('likes', '_id name')
      .populate('comment', '_id text')
      .exec();
      res.json(result);
    }catch(err) {
      return res.status(400).json({
        error:errorHandler.getErrorMessage()
      });
    }
  };

  const removecomment = async (req,res)=> {
    try{
      const result = await Post.findByIdAndUpdate(
        req.body,postId,
        {$pull: {Comment:req.body.userId}});
        next();
    }catch(err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage()
        });
    }
};

export default {
    create,
    list,
    read,
    remove,
    update,
    postById,
    addlike,
    defaultPhoto,
    addcomment,
    removelike,
    removecomment
};