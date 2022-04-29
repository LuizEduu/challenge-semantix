import 'reflect-metadata'

import 'express-async-errors'
import { env } from 'process'
import { config } from 'dotenv'
import { localApp } from './app/LocalApp'

config()

localApp.listen(env.PORT, () => {
  console.log(`Server is running at port ${env.PORT as string}`)
})
