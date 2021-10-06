/* eslint-disable no-console */
import server from '@presentation/http'
import { constants } from '@app/constants'

const {
  server: { serverPort },
} = constants

server
  .start()
  .then((app) => {
    app.listen(serverPort, () => {
      console.log(`Server's running on port ${serverPort}`)
    })
  })
  .catch(console.error)
