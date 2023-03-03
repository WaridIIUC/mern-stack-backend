import express from "express";

import {
    loginUser,
    signUp
} from "../controllers/UserController.js";

const router = express.Router();

// router.get('/signup', signUp);
// router.get('/products/:id', getProductById);
router.post('/signup', signUp);
router.post('/login', loginUser);






export default router;

