const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

connectDB();

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))


app.listen(process.env.PORT, () =>
    console.log("Server Running")
)