import express from 'express';
import { routerUser}  from '../api/user/network';
import { routerAuth } from '../api/auth/network';
const swaggerUi = require('swagger-ui-express');

const swaggerDoc = require('../api/swagger.json')

const routerApi = (app:any)=>{
  const router = express.Router();
  app.use('/api',router);
  router.use('/docs',swaggerUi.serve , swaggerUi.setup(swaggerDoc));
  router.use('/user',routerUser);
  router.use('/auth', routerAuth)

}

export default routerApi;