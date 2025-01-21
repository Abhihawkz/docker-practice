import express from "express";
import { createClient } from "redis";

const app = express();
const client = createClient();
client.on('error',(err) => console.log(`Error while connecting to redis ${err}`));


function processSubmisstion(payload:string){
    const {problemId,userId,code,language} = JSON.parse(payload);
    console.table([problemId,userId,code,language])
}
async function startWorker() {
    try {
        await client.connect();
        while(1){
            const payload = await client.brPop('submissions',0);
            processSubmisstion(payload);


        }


    } catch (error) {
        console.log(error)
    }
}
startWorker()