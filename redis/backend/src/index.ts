import express from "express";
import { createClient } from "redis";

const app = express();

app.use(express.json());
const client = createClient();
client.on('error',(err)=> console.log(`Error while connecting to redis`))


app.post("/submit",async(req,res)=>{
    const {problemId,userId,code,language} = req.body;

    try {
        await client.lPush("submissions",JSON.stringify({problemId,userId,code,language}))
        res.status(200).json({msg:"submission recieved and saved"});

    } catch (error) {
        console.log(error);
    }
})


async function startServer() {
    try {
        await client.connect();
        
        app.listen(3000,()=>{
            console.log(`Server is running in Port 3000`)
        })

    } catch (error) {
        console.log("Error while connectiong to server"+error);
    }
    
}

startServer()