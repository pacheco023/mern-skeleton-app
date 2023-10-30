import express from 'express';
import postCtrl from '../controllers/post.controller';
import authCtrl from '../controllers/auth.controller';


const router = express.Router();

router.route('/api/posts')
  .get(postCtrl.list)
  .post(postCtrl.create);



router.route('/api/posts/defaultphoto')
  .get(postCtrl.defaultPhoto);

router.route('/api/posts/like')
  .put(authCtrl.requireSignin,
    postCtrl.addlike,
    postCtrl.addcomment);

router.route('/api/posts/unlike')
  .put(authCtrl.requireSignin,
    postCtrl.removelike,
   postCtrl.removecomment);

router.route('/api/auth/signin')
  .post(authCtrl.signin);
router.route('/api/auth/signout')
  .get(authCtrl.signout);



router.param('postId',postCtrl.postById);

router.route('/api/posts/:postId')
  .get(authCtrl.requireSignin, postCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.remove);

export default router;
