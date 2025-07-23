// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";


// const app = express()

  

// app.use(cors({

// origin: process.env.CORS_ORIGIN,
// Credentials: true
// }))


// app.use(express.json({limit: "50mb"}))
// app.use(express.urlencoded({extended: true, limit: "50mb"}))     // extended me object ke ander object de sakte hain

// app.use (express.static("public"))
// app.use(cookieParser())


// // routers import

// import userRouter from "./routes/user.routes.js";

// // routes declaration
// app.use("/users", userRouter);

//  http://localhost:8000/users/register    

//   // http://localhost:8000/users/login 


// export { app}



import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());


// routes import
import userRouter from "./routes/user.routes.js";

// routes declaration

app.use("/api/v1/users", userRouter);

// http://localhost:8000/api/v1/users/register

export { app }
