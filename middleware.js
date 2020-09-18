const axios = require('axios')

async function getDecision(req, res, next) {
  console.log(req.params['username'])
  // logic to determine who the user is /users/chukwuemeka = [users. chukwuemak]
  var userObject = {
    input: {
      user: req.params['username'],
      path: req.path.split('/').slice(1,),
      method: req.method
    }
  }
  const response = await axios({
    // url: 'http://127.0.0.1:8181/v1/data/httpapi/authz',
    url: 'http://opa:8181/v1/data/httpapi/authz',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: userObject
  })

  console.log(response.data, '>>>')

  if (response.data.result['allow']) {
    res.locals.data = response.data
    return next()
  }

  return res.status(401).json({
    success: false,
    message: 'access-denied - user not allow to access this resource'
  })
}

module.exports = {
  getDecision
}