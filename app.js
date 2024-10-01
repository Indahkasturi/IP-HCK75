const app = express()
const port = 3000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require("./routers"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
  module.exports = app
