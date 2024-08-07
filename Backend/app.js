import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import runServer from "./index.js";

dotenv.config();

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// routes
import userRouter from "./src/routes/user.router.js"
import videoRouter from "./src/routes/video.router.js"
import tweetRouter from "./src/routes/tweet.router.js"
import commentRouter from "./src/routes/comment.router.js"
import subscriptionRouter from "./src/routes/subscription.router.js"
import likeRouter from "./src/routes/like.router.js"
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/subscription", subscriptionRouter)
app.use("/api/v1/likes", likeRouter)

runServer();

export { app }