import express from "express"; //Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
import cors from "cors"; //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
import dotenv from "dotenv"; //Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
import bodyParser from "body-parser"; //Body parser is used to parse the incoming request bodies in a middleware before you handle it.
import morgan from "morgan"; //Morgan logs HTTP requests for monitoring and debugging.
import { frontendUrl } from "./config/keys.js";

//import mongodb connection

import connectMongodb from "./init/mongodb.js";

//import routes

//load environment variables
dotenv.config();

//connect to mongodb
connectMongodb();

//initialize express
const app = express();

//middlewares
// This middlewares will used for online servers

app.use(
    cors({
        origin: frontendUrl,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json({limit : "500mb"}));
app.use(bodyParser.urlencoded({limit : "500mb", extended : true}));
app.use(morgan("dev"));

//routes
// This routes will used for online servers

//Not found controller

//Error handler

export default app;