import express from 'express';
import controllerAdoption from '../controllers/controllerAdoption.js';

const route = express.Router();

route.get('/', controllerAdoption.getAll);
route.get('/:id', controllerAdoption.getOne);
route.post('/', controllerAdoption.create);
route.put('/:id', controllerAdoption.update);
route.delete('/:id', controllerAdoption.delete);

export default route;
