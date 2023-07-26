import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyJwt = (req, res, next) => {
  const token = req.headers.token;
  // console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.status(409).send(err);
    } else {
      req.user = data;
      next();
    }
  });
};
