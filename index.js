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
  // Below  code was used to get Paola in list with ID 11765267
  /*
  const persons = await lib.PersonsController.getAllPersons(input, (person) => {
    console.log(person)
  }) */

  // get all activities for Paola, filter to their ID & excluding items that are completed
  const firstRun = lib.ActivitiesController.getAllActivitiesAssignedToAParticularUser({ userId: 11765267, limitId: 11765267, done: 0 }, () => {
  })

  await Promise.all([firstRun]).then((result) => { // get Paola's activities
    console.log('Last item ID: ', result[0].data[result[0].data.length - 1].id) // get the last item
    setTimeout(async () => { // then sleep for allotted time
      const secondRun = await lib.ActivitiesController.getAllActivitiesAssignedToAParticularUser({ userId: 11765267, limitId: 11765267, done: 0 }, () => {
      }) // next get the list again
      console.log('Second Run length', secondRun.data.length)
      // compare list then email if list different
      if (secondRun.data[secondRun.data.length] === result[0].data[result[0].data.length]) {
        // this item is the same
      } else {
        console.log('DIfferent Item')
      }
    }, 120000)
  })

  res.sendStatus(200)
})
