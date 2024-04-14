import bcrypt from "bcrypt";

export const register = async (req, res) => {
    const {username, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(hashedPassword);
};

export const login = (req, res) => {
    console.log("test");
};

export const logout = (req, res) => {
    console.log("test");
};