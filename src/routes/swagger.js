import express from 'express'
import SwaggerUI from 'swagger-ui-express'
import fs from 'fs'
import YAML from 'yaml'

const router = express.Router()

const swaggerDocument = YAML.parse(fs.readFileSync('src/docs/swagger.yaml', 'utf8'))

router.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerDocument))

export default router
