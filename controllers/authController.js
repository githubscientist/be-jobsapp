const authController = {
    register: async (req, res) => {
        try {
            res.json({ message: 'Register route' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    login: async (req, res) => {
        try {

        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    logout: async (req, res) => {
        try {

        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    me: async (req, res) => {
        try {

        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }
}

module.exports = authController;