
import express from 'express'
import { router } from '../routes'

const localApp = express()
localApp.use(express.json())
localApp.use(router)

export { localApp }
