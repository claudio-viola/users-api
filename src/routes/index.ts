// tslint:disable:no-duplicate-string
import * as express from 'express';
import * as usersController from '../controllers/users';
import { schemaValidator } from '../middleware/validation';

const router: express.Router = express.Router();
router.post('/api/users',
  schemaValidator('/users/create'), usersController.create);
router.get('/api/users', usersController.getAll);
router.get('/api/users/:id', usersController.get);
router.put('/api/users/:id',
  schemaValidator('/users/update'), usersController.update);
router.delete('/api/users/:id', usersController.remove);

export {
    router,
};
