/* eslint-disable no-console */
import server from '@src/presentation/http'

const { SERVER_PORT } = process.env

server
  .start()
  .then((app) => {
    app.listen(SERVER_PORT || 3000, () => {
      console.log(`Server's running on port ${SERVER_PORT || 3000}`)
    })
  })
  .catch(console.error)
