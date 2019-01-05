import { Success } from 'lib/Response'

export function handler(event, context, callback) {
  const userData = event.requestContext.authorizer.claims
  return Success(userData)
}