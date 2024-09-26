import express from 'express'
import { configDotenv } from 'dotenv'
import mongoose from 'mongoose'
import { appRoutes } from './routes/appRoutes.js'

configDotenv({path:'.env'})

const port = process.env.PORT || 4001

const app = express()

app.use(express.json())

app.use(appRoutes)

const uri = process.env.MONGOOSE_URL
mongoose.connect(uri)
   .then(()=>{
    app.listen(port, async() => {
    console.log(`Server is running on port ${port}`)
   }) 
})
.catch((error)=> {
    console.log(error,'Internal server error')
})