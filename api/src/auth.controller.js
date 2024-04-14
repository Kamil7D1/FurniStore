import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from './lib/prisma.js';
import 'dotenv/config';

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        console.log(hashedPassword);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({message: "User created."});
    } catch (err){
        console.log(err);
        res.status(500).json({message: "Failed to create user."});
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {

        const user = await prisma.user.findUnique({
            where: {
                username,
            }
        });

        if(!user){
            return res.status(401).json({message: "Invalid Credential"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid Credential"});
        }

        const age = 1000 * 60 * 60 * 24;

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET_KEY,
            {expiresIn: age}
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age,
        })
            .status(200)
            .json({message: "Login Successful"});

    } catch (err){
        console.log(err);
        res.status(500).json({message: "Failed to login"});
    }
};

export const logout = (req, res) => {
    console.log("test");
};