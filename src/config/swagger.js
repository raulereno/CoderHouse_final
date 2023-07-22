
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "E-commerce",
            description: "API"
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}

module.export = { swaggerOptions }