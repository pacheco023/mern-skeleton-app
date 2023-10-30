import Product from '../models/product.model';

import ErrorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
    const product = new Product(req.body);
    try{
        await product.save();
        return res.status(200).json({
            message: 'Successfully signed up!'
        });
    } catch (err) {
        return res.status(400).json({
            error: ErrorHandler.getUniqueErrorMessage(err)
        });
    }
};

const read = (req, res) => {
    req.profile.salt = undefined;
    req.name = 'ss';
    return res.json(req.profile);
};

const list = async (req, res) => {
    try {
        let products = await Product.find().select('name product joined');
        res.json(products);
    } catch (err) {
        return res.status('400').json({
            error: ErrorHandler.getUniqueErrorMessage(err)
        });
    }
};

const productById = async (req, res, next, id) => {
    try {
        let product = await Product.findById({_id: id});
        if(!product) {
            return  res.status(400).json({
                error: 'product not found'
            });
        }
        req.profile = product;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: "Could not retrieve product"
        });
    }
};

const update = async (req, res, next) => {
    try{
        let product = req.profile;
        product = merge(product, req.body);

        product.updated = Date.now();
        await product.save();
        product.hashed_password = '';
        product.salt = '';
        res.json(product);
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: ErrorHandler.getUniqueErrorMessage(err)
        });
    }
};

const remove = async (req, res, next) => {
    try {
        console.log('deleted');
        let product = req,profile;
        console.log('user to remove', product);
        let deletedproduct = await product.deleteOne();
        deletedproduct.hashed_password = '';
        deletedproduct.salt = '';
        res.json(deletedproduct);
    } catch(err) {
        console.log(err);
        return res.status(400).json({
            error: ErrorHandler.getUniqueErrorMessage(err)
        });
    }
};

export default {
    create,
    list,
    read,
    remove,
 productById,
    update
  };