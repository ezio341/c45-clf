import express from "express";
import route from "./routes/index.js"
import cors from "cors"
import {config} from "dotenv"
import bodyParser from 'body-parser'
const app = express()
if(process.env.NODE_ENV !== 'production'){
  config()
}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use('/static', express.static('files'))
app.use('/api', route)
app.route('/').get((req,res)=>{
  res.sendFile(process.cwd()+"/views/index.html")
})
const PORT = process.env.PORT || '3000'
app.listen(PORT, ()=> console.log('server running at '+PORT))