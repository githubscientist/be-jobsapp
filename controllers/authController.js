const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const authController = {
    register: async (req, res) => {
        try {
            // get the details of the user from the request body
            const { name, email, password } = req.body;

            // check if the user already exists
            const user = await User.findOne({ email });

            // if the user exists, return an error
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create a new user object
            const newUser = new User({ name, email, password: hashedPassword });

            // save the user to the database
            await newUser.save();

            // return a success message
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    login: async (req, res) => {
        try {
            // get the details of the user from the request body
            const { email, password } = req.body;

            // check if the user exists
            const user = await User.findOne({ email });

            // if the user does not exist, return an error
            if (!user) {
                return res.status(400).json({ message: 'User does not exist' });
            }

            // check if the password is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // create a token
            const token = jwt.sign({ id: user._id }, JWT_SECRET);

            // set the token in the cookie
            res.cookie('token', token, { httpOnly: true });

            // return a success message
            res.status(200).json({ message: 'Login successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    logout: async (req, res) => {
        try {
            // clear the token from the cookie
            res.clearCookie('token');

            // return a success message
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    me: async (req, res) => {
        try {
            // get the userId from the request object
            const { userId } = req;

            // get the user details from the database
            const user = await User.findById(userId).select('-password -__v');

            // return the user details
            res.status(200).json(user);
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = authController;