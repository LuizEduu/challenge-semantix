
import express from 'express'

const localApp = express()
localApp.use(express.json())

export { localApp }
