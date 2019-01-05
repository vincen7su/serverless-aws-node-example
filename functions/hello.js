import { Success } from 'lib/Response'

export function handler(event) {
  const data = event.requestContext.authorizer.test
  return Success(data)
}