import jwt from 'jsonwebtoken';
import "dotenv/config";

const userAuth = async (req, res, next) => {

  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status("401").json({ message: "No Token Provided, Access Denied, UnAuthenticated.", success: false });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = tokenDecoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }

};


export default userAuth;