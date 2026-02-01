/* 
-> Server ko create krna yha pr
->Config krna
*/

const express = require("express")
const noteModel = require("./model/notes.model")

const app = express()

app.use(express.json())
/* 
-> POST  /api/notes
-> notes{title,description} = req.body
-> Create new note and save data in mongoDb
*/
app.post("/api/notes", async(req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title , description
    })

    res.status(201).json({
        message  : "Notes Created successfully...",
        note
    })

})

/* 
->GET /api/notes
-> Fetch all the note data from the MongoDb and send them in the response
*/

app.get("/api/notes",async(req,res)=>{

   const note = await noteModel.find() //find() always return array of objext and help to find data available in the database..

   res.status(200).json({
        message:"Notes fetch successfully...",
        note
   })
})

/* 
->DELETE /api/notes:id
-> Delete notes with the id from the req.params
*/

app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id

    const notes = await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message : "Notes delete successfully...",
        notes
    })
})

/* 
->PATCH /api/notes:id
-> Update the description of the note by id..
-> req.body{description}
*/

app.patch("/api/notes/:id", async(req,res)=>{
    const id = req.params.id
    const {description} = req.body

   const notes = await noteModel.findByIdAndUpdate(id, {description})

   res.status(200).json({
        message : "Notes updated successfully..",
        notes
   })
})
module.exports = app