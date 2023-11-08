const jwt = require('jsonwebtoken');
const secretKey = "192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf";


function verifyToken(req, res, next) {
  const tokenWithBearer = req.headers.authorization;
  console.log(req.headers);
  console.log("tokenWithBearer", tokenWithBearer);
  const tokenParts = tokenWithBearer.split(' ');
  console.log("tokenParts",tokenParts);
  const token = tokenParts[1];
  console.log("tokenqwertyt",token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Forbidden' });
    }

    // If the token is valid, store the decoded information in the request for later use
    req.user = decoded;
    next(); // Call the next middleware or route handler
  });
}

module.exports = verifyToken;
