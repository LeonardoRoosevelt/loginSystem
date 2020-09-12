const mongoose = require("mongoose")
const user = require("../user")
mongoose.connect("mongodb://localhost/account-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on("error", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("mongodb connected!")

  user.create([
    {
      firstName: "Tony",
      email: "tony@stark.com",
      password: "iamironman"
    },
    {
      firstName: "Steve",
      email: "captain@hotmail.com",
      password: "icandothisallday"
    },
    {
      firstName: "Peter",
      email: "peter@parker.com",
      password: "enajyram"
    },
    {
      firstName: "Natasha",
      email: "natasha@gamil.com",
      password: "*parol#@$!"
    },
    {
      firstName: "Nick",
      email: "nick@shield.com",
      password: "password"
    }
  ])

  console.log("done")
})
