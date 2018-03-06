import AWS from 'aws-sdk'

function cognitoAuthenticateUser({ userName, password }) {
  const settings = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    UserPoolId: 'ap-northeast-1_XXXXXXXXX',
    ClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
    AuthParameters: {
      USERNAME: userName,
      PASSWORD: password
    }
  }

  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })

  return new Promise((resolve, reject) => {
    cognitoIdentityServiceProvider.adminInitiateAuth(settings, (error, data) => {
      if (error) {
        reject(error)
      } else {
        resolve(data.AuthenticationResult.IdToken)
      }
    })
  })
}

export async function handler(event, context, callback) {
  const input = JSON.parse(event.body)
  if (input && input.userName && input.password) {
    try {
      let token = await cognitoAuthenticateUser({
        userName: input.userName,
        password: input.password
      })
      callback(null, { 200, body: JSON.stringify(token) })
    } catch(error) {
      console.log(error)
      callback(null, { error.code, body: JSON.stringify(error) })
    }
  } else {
    callback(null, { 400, body: JSON.stringify('Bad Request') })
  }
}