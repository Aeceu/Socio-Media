const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  // check if jwt exist
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuth };
