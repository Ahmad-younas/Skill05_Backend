require("./config/db");
const express = require("express");
const cors = require("cors");
const recruiterRouter = require("./routes/recruiterRoutes");
const candidateRouter = require("./routes/candidateRoutes");
const adminRouter = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
// cors
app.use(cors());
app.use(express.json());
app.use(express.static("../assets"));
app.use(express.static("../assets/files"));
app.use(express.static("../assets/build"));
// app.use("files", express.static(__dirname + "/assets/files"));
console.log("path",__dirname + '/build');
app.use(express.static(path.join(__dirname + "build")));
app.use('/health',(req,res)=>{
    res.send("OK from server").status(200);
})

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/recruiter", recruiterRouter);
app.use("/api/candidate", candidateRouter);
app.use("/api/admin", adminRouter);

module.exports = app;
