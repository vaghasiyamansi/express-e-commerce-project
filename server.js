require("dotenv").config()
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ports = process.env.PORTS;
const server = express();


// in-built middleware
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/',(req,res)=>{
    res.send({msg:"welcome to Express"});
    res.end();
})

// User routes
const userRoutes = require("./routes/user.routes");
server.use("/api/user",userRoutes);



server.listen(ports, () => {
    // Database connection
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("Database connected..."))
        .catch(err => console.log(err))
    console.log(`server start http://localhost:${ports}`);
})