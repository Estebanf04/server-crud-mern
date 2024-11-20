import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'API Rest CRUD - Esteban Fandos',
            version: "1.0.0",
            description: "Employee Rest API with CRUD operations, built with Node.js, Express.js, TypeScript, and tested with Jest.",
        },
    },
    apis: ['./src/swaggerDocumentation.yml']
}

const swagger = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .swagger-ui .topbar{
            background-color: black;
            padding: 20px;
        }

        .swagger-ui .topbar .link {
            display: none;
        }

        .swagger-ui .info p {
            font-size: 20px;
        }

    `,
    customSiteTitle: 'API Rest | Documentacion',
    customfavIcon: 'https://estebanfandos.com/favicon.png'
}

export default swagger
export {
    swaggerUiOptions
}