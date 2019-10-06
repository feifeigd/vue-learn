
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import yaml from 'yamljs';

const app = express();
const port = 9528;
const { connector, summarise } = require('swagger-routes-express');

// Compression, Logger, Enable CORS, 
app.use(compression(), morgan('dev'), cors())
    // POST, PUT, DELETE body parser
    .use(bodyParser.json({limit: '20mb'}), bodyParser.urlencoded({limit:'20mb', extended: false}))
    // No cache
    .use((req, res, next) => {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
            .header('Pragma', 'no-cache')
            .header('Expires', '-1');
        next();
    });

// Read and swagger config file
const apiDefinition = yaml.load(path.resolve(__dirname, 'swagger.yml'));

function onError(error: any){
    if(error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch(error.code){
        case 'EACCES':
            console.error('Express ERROR (app) : %s requires elevated privileges', bind);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log('Express ERROR (app) : %s is already in use', bind);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Create HTTP Server
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
console.log(`Mock server started on port ${port}!`);
