export function handler(event, context, callback) {
  const data = event.requestContext.authorizer.test
  callback(null, { 200, body: JSON.stringify(data) })
}