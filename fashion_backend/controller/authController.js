import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/userModel.js';

export const registerUser = async (req, res) => {
    try {
        const { username, mobileNo, emailId, password } = req.body;

        const existingUser = await getUserByEmail(emailId);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, mobileNo, emailId, hashedPassword);

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await getUserByEmail(emailId);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate JWT Token
        const secretKey = process.env.JWT_SECRET || "your_default_secret_key";
        let token;
        try{
            token = jwt.sign(
                { id: user.id, username: user.username },
                secretKey,
                { expiresIn: '1h' }
            );
        } catch (error) {
            console.error("JWT Signing Error:", error.message);
            return res.status(500).json({ message: "Failed to generate token" });
        }

        // Set HTTP-Only Cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict",
            maxAge: 3600000 // 1 hour
        });

        res.json({ 
            message: "Login Successful", 
            user: { id: user.id, username: user.username }, 
            token 
        });

        console.log(res);
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};