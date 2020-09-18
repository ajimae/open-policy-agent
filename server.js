const express = require('express')
const bodyParser = require('body-parser')

const { users } = require('./fixtures')
const { getDecision } = require('./middleware');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)

/**
 * start developing endpoints here
 */

app.get('/', function(req, res, next) {
  res.status(200).json({
    success: true,
    message: 'welcome to node opa server implementation',
  })
  next()
})

app.get('/users', function(req, res, next) {
  res.status(200).json({
    success: true,
    message: 'list of all users fetched successfully',
    data: users
  })
  next()
})

app.get('/user/:username', getDecision, function(req, res, next) {
  return res.status(200).json({
    success: true,
    message: 'welcome to node opa server implementation',
    data: res.locals.data
  })
  next()
})

app.listen(app.get('port'), function() {
  console.log('server listening on port %s', app.get('port'))
})
