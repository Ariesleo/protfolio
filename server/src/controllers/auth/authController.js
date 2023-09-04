import jwt from 'jsonwebtoken';
import config from '../../configs/config.js';
import statusCodes from '../../constants/statusCodes.js';
import { CommonError } from '../../lib/api/error/commonError.js';
import { createError } from '../../lib/api/error/errorFactory.js';

// login user
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw {
        ...CommonError.BAD_REQUEST,
        message: 'Fields are required',
      };
    } else {
      if (username === config.userName && password === config.userPassword) {
        const token = jwt.sign({ username, password }, config.jwtSecret, {
          expiresIn: config.jwtLifetime,
        });
        res.status(statusCodes.OK).send({ token });
      } else {
        throw {
          ...CommonError.BAD_REQUEST,
          message: 'Invalid Credentials',
        };
      }
    }
  } catch (e) {
    next(createError(e));
  }
};

export { login };

/* 
 have to do two more things 
 1==> generate the token
 2==> store the token in the database
 3==> send the token to the client
 4==> client will request the data to the server 
*/
