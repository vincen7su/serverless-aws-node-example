export function handler(event, context, callback) {
  let userData = event.requestContext.authorizer.claims
  callback(null, { 200, body: JSON.stringify(userData) })
}