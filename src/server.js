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
const corsOptions = {
  origin: 'http://localhost:3001/api/recruiter/getpostedJob', // Replace with the origin of your Flutter app
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (e.g., cookies, authorization headers)
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/recruiter", recruiterRouter);
app.use("/api/candidate", candidateRouter);
app.use("/api/admin", adminRouter);

app.use('/health',(req,res)=>{
    res.send("OK from server").status(200);
})


app.use(express.static("../assets"));
app.use(express.static("../assets/files"));
app.use(express.static("../assets/build"));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/build', 'index.html'));
  });
  
// app.use("files", express.static(__dirname + "/assets/files"));
// console.log("path",__dirname + '/build');
// app.use(express.static(path.join(__dirname + "build")));

// bodyparser


module.exports = app;
