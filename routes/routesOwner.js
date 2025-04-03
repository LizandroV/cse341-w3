import express from 'express';
import controllerOwner from '../controllers/controllerOwners.js';
import { validateToken } from '../helpers/authentication.js';

const route = express.Router();

route.post('/register', controllerOwner.register);
route.post('/login', controllerOwner.login);
route.get('/profile', validateToken, controllerOwner.profile);

export default route;
