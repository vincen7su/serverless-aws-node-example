import { Failure } from 'lib/Response'

const JWT_TOKEN_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/

function generatePolicy(principalId, effect, resource, context = {}) {
  let authResponse = {}

  authResponse.principalId = principalId
  if (effect && resource) {
    let policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    let statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }

  authResponse.context = context
  return authResponse
}

export async function handler(event, context, callback) {
  try {
    let idToken = event.authorizationToken.split('Bearer ').join('')
    if (JWT_TOKEN_REGEX.test(idToken)) {
      callback(null, generatePolicy('HELLO', 'Allow', event.methodArn, { test: '123' }))
    } else {
      return Failure('Unauthorized')
    }
  } catch(error) {
    console.log(error)
    return Failure('Unauthorized')
  }
}