import express from "express"
import mongoose from "mongoose";

const app = express();
app.use(express.json())
const port = 3000;

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
});

const User = mongoose.model("Users",userSchema);


app.post("/",async(req,res)=>{
    const {username,password} = req.body;

    await User.create({
        username,password
    })
    res.json({msg:"created"})
});

app.get("/",(req,res)=>{
        res.json({msg:"healthcheck"})
});


(async function connectDb() {
    try {
        const res = await mongoose.connect("mongodb://mydb:27017/docker")
        console.log(res.connection.host)
    } catch (error) {
        console.log(error)
    }
})();

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})