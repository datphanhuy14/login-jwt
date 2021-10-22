import jwt from 'jsonwebtoken';
require('dotenv').config();

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId
    };
    jwt.sign(
      { data: userData },
      secretSignature || accessTokenSecret,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife || accessTokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      },
    );
  });
};

const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};

export {
  generateToken,
  verifyToken,
};
