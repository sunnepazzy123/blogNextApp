const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const colors = require("colors")
const connectDB = require("./config/db.js")

const blogRoute = require("./routes/blog.js")
const authRoute = require("./routes/auth")


//Load env file
dotenv.config()
//App
const app = express()

//Exec db
connectDB()



//middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

//Cross Site  using cors
if(process.env.NODE_ENV == "development"){  
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

//Route Middleware
app.use("/api", blogRoute)
app.use("/api", authRoute)





const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> {
    console.log(`Server is connected on PORT ${PORT}`.yellow)
})