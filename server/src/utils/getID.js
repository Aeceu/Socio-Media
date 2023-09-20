const jwt = require("jsonwebtoken");

const getID = (req, res) => {
  try {
    const cookie = req.cookies.token;
    if (!cookie) res.status(200).json(null);

    const token = jwt.verify(cookie, process.env.SECRET_TOKEN);
    res.status(200).json(token.id);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getID;
