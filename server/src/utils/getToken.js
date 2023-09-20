const jwt = require("jsonwebtoken");

const getToken = (req, res) => {
  const cookie = req.cookies.token;
  if (cookie) {
    const data = jwt.verify(cookie, process.env.SECRET_TOKEN);
    return data.id;
  } else {
    return null;
  }
};

module.exports = getToken;
