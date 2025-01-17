import jwt from 'jsonwebtoken';
import "dotenv/config";


const AdminAuth = (req, res, next) => {

  try {
    const dataAuth = req.headers.authorization;
    if (!dataAuth) {
      return res.status(401).json({ message: "No Token Provided, UnAuthenticated" });
    }
    const token = dataAuth.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    if (verifyToken.email === process.env.ADMIN_EMAIL && verifyToken.password === process.env.ADMIN_PASSWORD) {
      next();
    } else {
      return res.status(403).json({ message: "You Don't Have Permession To Access This Resources, Forbeddin" });
    }
  } catch (error) {
    console.log("error from middleware");
    return res.status(500).json({ message: `${error.message}` });
  }

};

export default AdminAuth;