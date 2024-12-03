const express=require("express");
const app = express();
const PORT=4000;
const rout=require("./routes/route");
const cors=require("cors");
const path=require("path");

app.use(cors());



// Using middleware
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Using routes
app.use("/api/v1",rout)

app.listen(PORT,()=>{
    console.log("Server listening!!");
})
