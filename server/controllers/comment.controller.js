import Comment from '../models/comment.model';
import merge from 'lodash/merge';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
    const comment = new Comment(req.body);
    try {
        await comment.save();
        return res.status(200).json({
           message: 'successfully signed up!' 
        });
    }catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try {
        let comments = await Comment.find().select('Comment updated created');
        res.json(comments);
    }catch (err) {
        return res.status('400').json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const update = async (req, res, next) => {
  try {
    let comment = req.profile;
    comment = merge(comment, req.body);

    comment.updated = Date.now();
    await comment.save();
    comment.salt = '';
    res.json(comment);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const read = (req, res) => {
  req.profile.salt = undefined;
  req.name = 'ss';
  return res.json(req.profile);
};

const commentById = async (req, res, next, id) => {
  try {
    let comment = await Comment.findById({_id: id});
    if(!comment) {
      return res.status(400).json({
        error: 'Comment not found'
      });
    }
    req.profile = like;
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Could not retrieve comment"
    });
  }
};

const remove = async (req, res, next) => {
    try {
      console.log('deleted');
      let comment = req.profile;
      console.log('user to remove', comment);
      let deletedComment= await user.deleteOne();
      deletedComment.hashed_password = '';
      deletedComment.salt = '';
      res.json(deletedComment);
    } catch(err) {
      console.log(err);
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
  };

  const addlike = async (req, res) => {
    try {
      const { userId, commentId } = req.body;
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $addToSet: { likes: userId } }, 
        { new: true }
      );

      res.json(updatedComment);
    } catch (err) {
      return res.status(400).json({
        error: "No se pudo dar me gusta"
      });
    }
  };

  const removeComment = async (req, res) => {
    try {
      const { userId, commentId } = req.body;
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { likes: userId } },
        { new: true }
      );

      res.json(updatedComment);
    } catch (err) {
      return res.status(400).json({
        error: "No se pudo quitar el comentario"
      });
    }
  };


  export default {
    create,
    list,
    read,
    remove,
    update,
    commentById,
    addlike,
    removeComment
    
  };
