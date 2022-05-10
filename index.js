const express = require("express");
const app = express();
const dotenv  =require("dotenv");
const globalDistributionSystem = require("./routes/globalDistributionSystem");
const stripe = require("./routes/stripe");
const cors = require("cors");
const path = require("path")

dotenv.config()
app.use(cors())
// middlewares
app.use(express.json());
app.use("/api/flight", globalDistributionSystem);
app.use("/api/checkout", stripe);

app.use(express.static(path.join(__dirname, "/client-site/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client-site/build/index.html'));
});


app.listen(process.env.PORT || 9900, ()=>{
    console.log("backend server is ready");
})