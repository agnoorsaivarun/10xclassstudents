const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//import routes
const routes=require("./routes/routes")

app.use(express.json());
app.use("/",routes)

module.exports=app