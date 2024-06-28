const express = require('express')
const app = express()
const port = 4000
const connectTo = require('./db.js')
connectTo();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://movix-mocm.vercel.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use("/api/v1", require("./Routes/createUser.js"));
app.use("/api/v1", require("./Routes/movieData.js"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})