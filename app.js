const path = require("path");
const http = require("http");
const express = require("express");
const port = process.env.PORT || 4000;
const pdp = path.join(__dirname,"./public");
const app = express();
const server = http.createServer(app);
app.use(express.static(pdp));
server.listen(port,()=>{
    console.log(`server is up on port${port}! `);
})

