import  express from 'express';
import productCtrl from '../controllers/product.controller';
import authCtrl from '../controllers/auth.controller';


const router = express.Router();

router.route('/api/product')
.get(productCtrl.list)
.post(productCtrl.create);

router.route('/api/product/:productId')
.get(authCtrl.requireSignin, productCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization,productCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization,productCtrl.remove);

router.param('productId', productCtrl.productById);

export default router;