import AWS from 'aws-sdk'
const iotData = new AWS.IotData({ endpoint: process.env.IOT_ENDPOINT })

export default function(iotParams) {
  return iotData.publish(iotParams).promise()
}