const { JWT_SECRET } = require("../utils/config");
const jwt = require('jsonwebtoken');

const auth = {
    checkAuth: (req, res, next) => {
        // get the token from the cookie
        const token = req.cookies.token;

        // if the token does not exist, return an error
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // verify the token
        jwt.verify(token, JWT_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // set the user in the request object
            req.userId = user.id;

            // proceed to the next middleware
            next();
        });
    },
}

module.exports = auth;