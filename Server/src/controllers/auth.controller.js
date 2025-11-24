import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

async function register(req, res) {
    // Registration logic here
    // Flow - validate input, hash password, create user in DB
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            passwordHash: hashedPass
        });

        await newUser.save();
        return res.status(201).json({message: "User registered successfully.", id: newUser._id, name: newUser.name, email: newUser.email});
    }
    catch(error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
};

async function login(req, res) {
    // Login logic here
    // Flow - check email, compare password, return JWT
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message: "Email not found."});
        }

        const isPasswordValid = bcrypt.compareSync(password, existingUser.passwordHash);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid password"});
        }

        const payload = {
            id: existingUser._id,
            email: existingUser.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});

        return res.status(200).json({message: "Login successful", token: token, user: {id: existingUser._id, name: existingUser.name, email: existingUser.email}});
    }
    catch(error) {
        return res.status(500).json({message: "Server error", error: error.message});
    }
}

export { register, login };