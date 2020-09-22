var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Swagger 接口文档',
    },
    host: 'localhost:8080',
    basePath: '/',
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js'],
};

var swaggerSpec = swaggerJSDoc(options);

module.exports = function (app) {

    /**
    * @swagger
    * definitions:
    *   form:
    *     properties:
    *       name:
    *         type: string
    *       age:
    *         type: integer
    *       sex:
    *         type: string
    */
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    /**
    * @swagger
    * /api/postdata:
    *   post:
    *     tags:
    *       - 基本接口
    *     description: 返回所有数据
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: form
    *         description: 唯一标识
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/form'
    *     responses:
    *       200:
    *         description: 成功
    */
    app.post("/api/postdata", (req, res) => {
        console.log(req.body);
        res.json({ result: 1 })
    })

    /**
    * @swagger
    * /api/getdata_query:
    *   get:
    *     tags:
    *       - 基本接口
    *     description: 返回所有数据
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         description: 唯一标识
    *         in: query
    *         required: true
    *         type: integer
    *     responses:
    *       200:
    *         description: 成功
    */
    app.get("/api/getdata_query", (req, res) => {
        console.log(req.query);
        res.json({ result: 1 })
    })

    /**
    * @swagger
    * /api/getdata_path/{id}:
    *   get:
    *     tags:
    *       - 基本接口
    *     description: 返回所有数据
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         description: 唯一标识
    *         in: path
    *         required: true
    *         type: integer
    *     responses:
    *       200:
    *         description: 成功
    */
    app.get("/api/getdata_path/:id", (req, res) => {
        console.log(req.params);
        res.json({ result: 1 })
    })

    app.get("/", function (req, res) {
        res.render("index");
    })
}