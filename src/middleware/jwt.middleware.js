import jwt from "jsonwebtoken";
const jwtAuth = (req, res, next) => {
  //1.read the token
  const token = req.headers["authorization"];

  //2.if no token return the error
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  //3.check if token is valid or not
  try {
    const payload = jwt.verify(token, "Uek8zG3GmPRHMrS4jMVPrNXxhA3MynzF");
    //wee use it when we create the cartitems
    req.userID = payload.userID;
    console.log(payload);
    //payload returns the payload data
  } catch (err) {
    //4. or else return error
    return res.status(401).send("unauthorized");
  }

  //5.if token is valid call next
  next();
};

export default jwtAuth;
