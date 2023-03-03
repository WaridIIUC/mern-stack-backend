import {PrismaClient} from "@prisma/client";

import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

const prisma = new PrismaClient();




export const signUp = async (req, res) => {
    const {name, username, password, roles} = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                username: username,
                password: password,
                roles: roles
            }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const loginUser = async (req, res) => {
    //const {name, username, password, roles} = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username
            }
        });
        //res.status(200).json(user);
    
        if(user){
            if(user.password == req.body.password)
            {
                //res.status(200).json(user);

                
                //generate token 

                const token = sign({
                    username: user.username,
                    userId: user.id,
                    roles: user.roles


                }, process.env.JWT_SECRET, {
                    expiresIn: 120
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "login successful",
                    "user": user
                });

            }
            else{
                res.status(401).json({msg: "Authentication Failed for password!"});
            }
        }
        else{
            res.status(401).json({msg: "Authentication Failed!"});
        }
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

