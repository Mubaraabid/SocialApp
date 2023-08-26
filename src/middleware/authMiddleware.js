import jwt from "jsonwebtoken";
const pathAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token)
      return res
        .status(401)
        .json({ message: "No Token Found, Please re-login" });

    token = token.replace("Bearer ", "");
    const decodeValue = jwt.verify(token, process.env.SECRETKEY, {});
    req.user = decodeValue;
    next();
  } catch (error) {
    console.log(error.message);
    if (error.message === "jwt expired") {
      return res.status(401).json({ message: "jwt expired, Please re-login" });
    }
  }
};

export default pathAuthenticated;
