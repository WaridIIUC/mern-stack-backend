import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;


const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        
        const token = authorization.split(' ')[1];
        const decode = verify(token, process.env.JWT_SECRET);
        const {username, roles} = decode;
        req.username = username;
        req.roles = roles;
        // console.log(decode);

        if (req.roles.includes("Admin")) {
            next();
        }
        else{
            res.status(404).json({msg: "Authentication failed as your are not Admin"})

        }
        

    } catch (error) {
        res.status(404).json({msg: "Authentication failed from middleware"})
        // next("Authentication failed from middleware");
    }
};


export default checkLogin;