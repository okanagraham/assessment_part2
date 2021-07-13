const express = require('express')
const app = express()
const lib = require('pipedrive')

const PORT = 1800

lib.Configuration.apiToken = '4aaf3dc71669d84f5198c16d3ad9e7ff7c214ad5'

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.get('/', async (req, res) => {
  const user = await lib.UsersController.getCurrentUserData()
  res.send(user)
})
