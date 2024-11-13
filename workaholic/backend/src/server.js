import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database.js';
import routes from './routes/index.js';
import setupSwagger from './swagger.js';
import open from 'open'; 

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

sequelize.authenticate()
  .then(() => console.log('Connection established successfully.'))
  .catch(err => console.error('Unable to connect:', err));


setupSwagger(server);
routes(server);

const PORT = process.env.PORT || 5000;
server.listen(process.env.PORT, () => {
  console.log(`App listening at http://localhost:${process.env.PORT}`);
  
  // Open Swagger UI in the browser automatically
  open('http://localhost:5000/api-docs');
});
