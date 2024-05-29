const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ 
        message: 'No token provided' 
    });
  }
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
            message: 'Failed to authenticate token' 
        });
    }
    req.user = decoded;
    next();
  });
};

module.exports = auth;
