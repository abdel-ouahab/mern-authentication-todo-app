// Create server
const express = require("express")
const app = express()
const _PORT = process.env.PORT;
const cors = require("cors")
const authRouter = require('./routes/authRouter')
const todoRouter = require('./routes/todoRouter')

// MIDDELWARES 
app.use(cors())
app.use(express.json())

// Route
app.use('/api/auth', authRouter)
app.use('/api/todo', todoRouter)

// Connect to DB
const   username= process.env.USERNAME,
        password= process.env.PASSWORD,
        database= process.env.DATABASE;
        
const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ydkkk12.mongodb.net/${database}?retryWrites=true&w=majority`)
.then(()=> console.log('Connected to MongoDB'))
.catch((error)=> console.error('Failed to connect to MongoDB: ', error));

app.listen(_PORT, ()=> {
    console.log(`App runing on ${_PORT}`)
})