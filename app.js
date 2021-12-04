import  express  from "express"
//import mysql from 'mysql'
import mongoose from 'mongoose'
import store from "./api/models/store.js";

const app = express();
const port =5500

const mongoURI ="mongodb+srv://API:fb5M1Ljem9BFiaXN@cluster0.ihuum.mongodb.net/ClusterO?retryWrites=true&w=majority"

mongoose.connect(mongoURI,{})

//conexion con mysql
/*const conexion= mysql.createConnection({

    host: 'localhost',
    database: '',
    user: 'root',
    password: ''

})
*/

//middlework
app.use(express.json({limit: "50mb"}))

//enpoint
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

app.get("/",(req ,res)=>{
    res.send("hello world...23")

});

//serve
app.listen(port,()=>{
    console.log(`serve on port http:/localhost: ${port}`);

})