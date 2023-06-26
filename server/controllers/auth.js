import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            handle,
            bio,
            location,
            profile_path
        } = req.body;

        const salt = await bcrypt.genSalt();
        const password_digest = await bcrypt.hash(password, salt);

        const newUser = new User({
            Name : name,
            user_handle : handle,
            email : email,
            password_digest: password_digest,
            picturePath : profile_path,
            followers : [],
            following : [],
            bio,
            location,
            tweets : []
        });

        const savedUser = await newUser.save();
        savedUser.password_digest = undefined;
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({type : "Auth Register Error", error : error.message});
    }
}

export const login = async (req, res) => {
    try {
        // for now except email only.. expand this to use userHandle also
        const { email, password} = req.body;
        const user = await User.findOne({email : email});
        console.log(req.body);
        if (!user) return res.status(400).json({message : "No user found", code : -1});

        const isMatch = await bcrypt.compare(password, user.password_digest);
        if (!isMatch) return res.status(401).json({message : "Auth Error (Wrong Password!)", code : 1});

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({code : 0, message : "SUCCESS", token, user});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}