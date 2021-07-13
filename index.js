const express = require('express')
const app = express()
const lib = require('pipedrive')

const PORT = 1800

lib.Configuration.apiToken = '4aaf3dc71669d84f5198c16d3ad9e7ff7c214ad5'

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
}).on('error', () => {
  console.log('Error occured while listening')
})

app.get('/', async (req, res) => {
  // Below  code shows Paola in list with ID 11765267
  /* const input = {}
  input.limit = 16

  const persons = await lib.PersonsController.getAllPersons(input, (person) => {
    console.log(person)
  }) */

  // get all activities for Paola

  const input = {}
  input.userId = 11765267
  input.limit = 1000

  const firstRun = lib.ActivitiesController.getAllActivitiesAssignedToAParticularUser(input, () => {

  })

  const secondRun = lib.ActivitiesController.getAllActivitiesAssignedToAParticularUser(input, () => {

  })

  await Promise.all([firstRun, secondRun]).then((result) => {
    console.log(result)
  })

  res.sendStatus(200)
})
