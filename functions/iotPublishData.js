import iot from 'lib/Iot'
import { Success, Failure } from 'lib/Response'

const TOPIC = 'IOT_TEST'

export async function handler() {
  try {
    await iot({
      topic: TOPIC,
      payload: JSON.stringify({ message: 'hello' })
    })
  } catch(error) {
    console.log(error)
    return Failure(error)
  }
}