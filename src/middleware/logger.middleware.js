import fs from "fs";
import winston from "winston";
//we are going to use fs promises using nodejs
//promises basically allows us to use create and write data into the files asychronously without using the callbacks

const fsPromise = fs.promises;

//create a function

// async function log(logData) {
//   try {
//     logData = `\n ${new Date().toString()} - ${logData}`;

//     //writefile takes two things one is path and another is data which returns the Promises(void) type void
//     await fsPromise.appendFile("log.txt", logData);
//   } catch (err) {
//     console.log(err);
//   }
// }

//creating logger using the winston

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  //when we recieve the request we have to log the request body
  //to get the string data req.url will be a string and req.body will be a object so we are changing to string
  //since user doesnot want to see the email and password we are using the if() condition

  const logData = `${req.url}-${JSON.stringify(req.body)}`;
  logger.info(logData);

  next();
};

export default loggerMiddleware;
