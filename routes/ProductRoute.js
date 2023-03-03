import express from "express";
import checkLogin from "../middlewares/CheckLogin.js";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getSuppliers,
    getSupplierByProductId
} from "../controllers/ProductController.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/suppliers', checkLogin, getSuppliers);
router.get('/suppliers/:id', getSupplierByProductId);




export default router;

