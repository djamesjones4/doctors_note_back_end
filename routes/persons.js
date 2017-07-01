const express = require('express')
const router = express.Router()
const knex = require('../knex')
// const boom = require('boom')
const jwt = require('jsonwebtoken')

// GET client's practitioner info for main view upon verifying token
router.get('/', function(req, res, next) {
  let user_name
  let client
  let practitioner
  let user_id
  jwt.verify(req.body.token, 'secret', (err, payload) => {
    if (payload) {
      user_name = payload.username
      user_id = payload.id
      client = payload.is_client
      practitioner = payload.is_practitioner
      // getClientInfo(user_name)
    } else if (err) {
      res.status(401).json({ error: 'please log in' })
    }
    if (client) {
      getClientInfo(user_name)
    } else if (practitioner) {
      getPractitionerInfo(user_id)
    }

    function getClientInfo(username) {
      knex('clients')
        .where('username', username)
        .then((data) => {
          console.log('clients data: ', data)
          res.json(data[0])
        })
    }
    function getPractitionerInfo(userid) {
      knex('practitioner_client')
        .where('practitioner_id', userid)
        .then((data) => {
          console.log('practitioner\'s data: ', data)
          res.json(data[0])
        })
    }
  })
})
module.exports = router