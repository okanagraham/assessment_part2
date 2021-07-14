const express = require('express')
const app = express()
const lib = require('pipedrive')
const nodemailer = require('nodemailer')

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'okanagraham@gmail.com',
    pass: 'innymtmrmtwxhmbp'
  }
})
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

  await Promise.all([firstRun]).then((firstResult) => { // get Paola's activities
    console.log('Last item ID: ', firstResult[0].data[firstResult[0].data.length - 1].id) // get the last item
    setTimeout(async () => { // then sleep for allotted time
      const secondRun = await lib.ActivitiesController.getAllActivitiesAssignedToAParticularUser({ userId: 11765267, limitId: 11765267, done: 0 }, () => {
      })
      // DEBUG: console.log('Second Run length', secondRun.data.length)
      // get the last item ID, then compare to the last item id of the second run, if second run
      // id is greater, then the list has changed
      if (secondRun.data[secondRun.data.length - 1].id === firstResult[0].data[firstResult[0].data.length - 1].id) {
        // this item is the same
        // DEBUG console.log('no change')
      } else {
        const mailOptions = {
          from: 'Assessment2 <noreply@okanagraham.com>',
          to: 'okanagraham@gmail.com',
          subject: 'New Activity found for Paolo',
          html: 'Content goes here'
        }
        await mailTransport.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log('Error found')
          }
        })
      }
    }, 10000)
  })

  res.sendStatus(200)
})
