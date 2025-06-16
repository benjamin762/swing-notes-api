import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import SwaggerUI from 'swagger-ui-express'
import { PORT } from '../utils/config.js'

const router = express.Router()

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Swing Notes API",
            description: "",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:" + PORT,
                description: "Local development server.",
            },
        ],
        tags: [
            {name: "a", description: "b"},
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ],
    },
    apis: ["./src/routes*.js"],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

router.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocs))

export default router