import express from 'express';
import commentCtrl from '../controllers/comment.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/comment')
.get(commentCtrl.list)
.post(commentCtrl.create);

router.route('/api/comments/like')
.put(authCtrl.requireSignin,
  commentCtrl.addlike);

  router.route('/api/comments/unlike')
.put(authCtrl.requireSignin,
  commentCtrl.removeComment);

router.route('/api/auth/signin')
  .post(authCtrl.signin);
router.route('/api/auth/signout')
  .get(authCtrl.signout);
  
  router.route('/api/comment/:commentId')
  .get(authCtrl.requireSignin, commentCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization,commentCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization,commentCtrl.remove);
  
  
  router.param('commentId', commentCtrl.commentById);

export default router;