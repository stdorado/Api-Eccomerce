import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Inmobiliaria Don Mario",
      version: "1.0.0",
    },
  },
  apis: ["src/router/carts.router.js", "src/router/products.router.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.use("/api/products/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  console.log(swaggerDocs);

};

export default swaggerDocs;