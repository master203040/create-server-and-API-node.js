import  express  from "express"
//import mysql from 'mysql'
import mongoose from 'mongoose'
import store from "./api/models/store.js";

const app = express();
const port =5500

//connect on mongoDB
const mongoURI ="mongodb+srv://API:fb5M1Ljem9BFiaXN@cluster0.ihuum.mongodb.net/ClusterO?retryWrites=true&w=majority"

mongoose.connect(mongoURI,{})


//middlework
app.use(express.json({limit: "50mb"}))

//Enpoint Enviar
app.post("/api/clients",(req,res)=>{
    
   let clientData= req.body
   let mongoRecords =[]
   clientData.forEach(client => {
        mongoRecords.push({
            fristname: client.fristname,
            phone: client.phone,
            address:client.address
       })
   });
   store.create(mongoRecords,(err,records)=>{
       if (err) {
           res.status(500),send(err)
       }else{
           res.status(200), send(records)
       }
   })
   //res.send('you have posted something')
    
})
//Enpoint Delete
app.delete("/api/clients",(req,res)=>{
    store.deleteMany({},()=>{
        res.status(500).send(err)

    })
})

//Enpoint Recivir 
app.get("/",(req ,res)=>{
    store.find({},(err,docs)=>{
        if (err) {
            res.status(500).send(err)
        }else{
            res.status(200).send(docs)
        }
    })

});

//server
app.listen(port,()=>{
    console.log(`serve on port http:/localhost: ${port}`);

})