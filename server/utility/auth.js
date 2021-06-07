const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");


const generateJWTToken = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.SECRET, {
      expiresIn: "15m",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const generateRefreshToken = (userId, ipAddress) => {
  try {
    return {
      rToken: generateRandomString(),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ip: ipAddress,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const generateRandomString = () => {
  return randomstring.generate({
    length: 40,
    charset: "hex",
  });
};

module.exports = {
  generateJWTToken,
  generateRandomString,
  generateRefreshToken,
};
