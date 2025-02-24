import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Demo Eshop API",
            version: "1.0.0",
            description: "API Documentation for the E-Commerce application",
        },
        servers: [
            {
                url: "http://localhost:8000/api/v1",
                description: "Local server",
            },
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
        security: [{ bearerAuth: [] }],
    },
    apis: ["src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
