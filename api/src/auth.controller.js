import bcrypt from "bcrypt";
import prisma from './lib/prisma.js';

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
        res.status(500).json({message: "Failed to create user."})
    }
};

export const login = (req, res) => {
    console.log("test");
};

export const logout = (req, res) => {
    console.log("test");
};