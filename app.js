const express = require("express")
const port = 3000
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const app = express()

mongoose.connect("mongodb://localhost/account-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.on("error", () => {
  console.error("Could not connect")
})

db.once("open", () => {
  console.log("connect success")
})

app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }))
app.set("view engine", "hbs")

app.get("/", (req, res) => {
  res.render("index")
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
