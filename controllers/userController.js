const User = require('../models/User');

const userController = {
    getProfile: async (req, res) => {
        try {
            // get the userId from the request object
            const userId = req.userId;

            // get the user profile from the database
            const userProfile = await User.findById(userId);

            // send the user profile in the response
            res.status(200).json(userProfile);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateProfile: async (req, res) => {
        try {
            // get the userId from the request object
            const userId = req.userId;

            // get the details to update from the request body
            const { name, email } = req.body;

            // update the user profile in the database
            const updatedProfile = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

            // send the updated user profile in the response
            res.status(200).json({ message: 'Profile updated successfully', updatedProfile });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteProfile: async (req, res) => {
        try {
            // get the userId from the request object
            const userId = req.userId;

            // delete the user profile from the database
            await User.findByIdAndDelete(userId);

            // logout the user
            res.clearCookie('token');

            // send the response
            res.status(200).json({ message: 'Profile deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    applyJob: async (req, res) => {
        try {

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    myApplications: async (req, res) => {
        try {

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;