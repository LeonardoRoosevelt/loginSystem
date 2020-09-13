const express = require("express")
const port = 3000
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const User = require("./models/user")
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

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("index")
})

app.post("/", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  let errorType = 0
  let verifiedAccount = {}
  let checkStatus = ""
  User.find()
    .lean()
    .then(users => {
      for (const user of users) {
        if (user.email === email && user.password === password) {
          checkStatus = "Correct"
          verifiedAccount = user
          return { checkStatus, verifiedAccount }
        } else {
          checkStatus = "Failed"
          verifiedAccount = {}
          if (user.email === email && user.password !== password) {
            errorType = 1
            return { errorType }
          }
        }
      }
      return { checkStatus, verifiedAccount }
    })
    .then(user => {
      if (checkStatus === "Correct") {
        res.render("welcome", { firstName: verifiedAccount.firstName })
      } else if (checkStatus === "Failed") {
        if (errorType === 1) {
          errorMessage = "密碼錯誤"
        } else {
          errorMessage = "查無使用者資料"
        }
        res.render("index", { errorMessage })
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
