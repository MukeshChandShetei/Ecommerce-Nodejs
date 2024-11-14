import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  //check if auth header is empty
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).send("No authorization details found");
  }
  console.log(authHeader);
  //if there are authorization headers we need to extract the credentials and verify they are correct or not
  //2.extract credentials.[Basic nndffjdfsdbf] base64data
  const base64credentials = authHeader.replace("Basic ", "");
  console.log(base64credentials);

  //3.decoding credentials
  //Buffer.from() is going to create a buffer after the decoding is done
  const decodedCred = Buffer.from(base64credentials, "base64").toString(
    "utf-8"
  );
  console.log(decodedCred); //[username:password]
  const creds = decodedCred.split(":");

  const user = UserModel.getAll().find(
    (u) => u.email == creds[0] && u.password == creds[1]
  );
  if (user) {
    next();
  } else {
    return res.status(401).send("Incorrect credentials");
  }
};
export default basicAuthorizer;
