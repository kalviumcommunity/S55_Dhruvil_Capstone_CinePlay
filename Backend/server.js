const express = require('express');
require('dotenv').config();
var cors = require('cors')


const app = express();
const port = 3000;
app.use(cors())

app.get('/',(req,res)=>{
    res.send("pong")
})

// Starting the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  }); 
}

module.exports = app;