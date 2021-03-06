import { Success } from 'lib/Response'

export function handler(event) {
  const userData = event.requestContext.authorizer.claims
  return Success(userData)
}