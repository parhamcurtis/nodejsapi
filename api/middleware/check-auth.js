const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization? req.headers.authorization.split(" ")[1]: "";
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch(err) {
        res.status(401).json({error: err})
    }
}