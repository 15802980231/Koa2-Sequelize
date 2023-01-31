import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { IP, PORT } from './constant';

const swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'Amber-OA系统', // Title (required)
    version: '1.0.0', // Version (required)
    description: '办公管理软件' // Description (optional)
  },
  host: `http://${IP}:${PORT}`, // Host (optional)
  basePath: '/' // Base path (optional)
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../router/*.ts')] // all api
};

const jsonSpc = swaggerJSDoc(options);
export default jsonSpc;
