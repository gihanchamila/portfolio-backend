import express from "express"; 
import cors from "cors"; 
import dotenv from "dotenv";
import bodyParser from "body-parser"; 
import morgan from "morgan"; //Morgan logs HTTP requests for monitoring and debugging.
import { frontendUrl } from "./config/keys.js";
import { errorHandler } from "./middlewares/errorHandler.js";

//import mongodb connection
import connectMongodb from "./init/mongodb.js";

//import routes
import { certificateRoute, fileRoute, projectRoute, resumeRoute, contactRoute, userRoute } from "./routes/index.js";

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
app.use("/api/v1/certificate", certificateRoute)
app.use("/api/v1/file", fileRoute)
app.use("/api/v1/project", projectRoute)
app.use("/api/v1/resume", resumeRoute)
app.use("/api/v1/connect", contactRoute)
app.use("/api/v1/user", userRoute)

//Not found controller

//Error handler
app.use(errorHandler)

export default app;