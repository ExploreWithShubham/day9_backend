// Server ko start krna yha se
require("dotenv").config()
const app = require('./src/app')
const connectToDb = require("./src/config/database")
const noteModel = require("./src/model/notes.model")

connectToDb()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})



