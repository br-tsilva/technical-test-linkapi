/* eslint-disable no-console */
import { app } from './index'

const { SERVER_PORT } = process.env

app.listen(SERVER_PORT || 3000, () => {
  console.log(`Server's running on port ${SERVER_PORT || 3000}`)
})
