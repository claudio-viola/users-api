// tslint:disable:arrow-return-shorthand
// tslint:disable:max-func-body-length
// tslint:disable:no-big-function
// tslint:disable:no-duplicate-string
// tslint:disable:no-unused
// tslint:disable:no-identical-functions
// tslint:disable:max-line-length
import { User } from '../../src/models/user';
import {
  expect,
  request,
  SANDBOX,
  sinon,
} from './setup';

describe('/api/users Tests', (): void => {

  before(async () => {
    await User.destroy({ where: {}, truncate: true, cascade: true, force: true, restartIdentity: true });
  });

  after(async () => {
    await User.destroy({ where: {}, truncate: true, cascade: true, force: true, restartIdentity: true });
  });
  describe('POST /api/users', (): void => {

    it('should return 201 and create a new user', async () => {
      return request
       .post('/api/users')
       .send({
         email: 'test@email.com',
         familyName: 'Doe',
         givenName: 'John',
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(201);
         const user = await User.findOne({ where: { email: 'test@email.com' } });
         const userModel = user.get();
         expect(userModel.email).to.eql('test@email.com');
         expect(userModel.familyName).to.eql('Doe');
         expect(userModel.givenName).to.eql('John');
         expect(userModel.id).to.eql(1);
       });
    });

    it('should return 400 BAD REQUEST for invalid attributes', async () => {
      return request
       .post('/api/users')
       .send({
         emails: 'invalidemail.com',
         familyNames: 'Doe',
         givenName: 'John',
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(400);
       });
    });

    it('should return 400 BAD REQUEST for invalid email', async () => {
      return request
       .post('/api/users')
       .send({
         email: 'invalidemail.com',
         familyName: 'Doe',
         givenName: 'John',
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(400);
       });
    });
  });

  describe('PUT /api/users/:id', (): void => {

    it('should return 204 and update an existing  user', async () => {
      return request
       .put('/api/users/1')
       .send({
         email: 'new@email.com',
         familyName: 'Doe the second',
         givenName: 'Johnathan',
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(204);
         const user = await User.findOne({ where: { email: 'new@email.com' } });
         const userModel = user.get();
         expect(userModel.email).to.eql('new@email.com');
         expect(userModel.familyName).to.eql('Doe the second');
         expect(userModel.givenName).to.eql('Johnathan');
         expect(userModel.id).to.eql(1);
       });
    });

    it('should return 400 BAD REQUEST for invalid attributes', async () => {
      return request
       .put('/api/users/1')
       .send({
         emails: 'invalidemail.com',
         familyNames: 'Doe',
         givenName: 'John',
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(400);
       });
    });

    it('should return 400 BAD REQUEST for invalid email', async () => {
      return request
       .put('/api/users/1')
       .send({
         email: 'invalidemail.com',
         familyName: 'Doe',
         givenName: 'John',
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(400);
       });
    });

    it('should return 404 if the user is not found', async () => {
      return request
       .put('/api/users/123')
       .send({
         email: 'invalid@email.com',
         familyName: 'Doe',
         givenName: 'John',
       })
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(404);
       });
    });
  });

  describe('GET /api/users/:id', (): void => {

    it('should return 200 OK and return the user', async () => {
      return request
       .get('/api/users/1')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(200);
         expect(res.body.email).to.eql('new@email.com');
         expect(res.body.familyName).to.eql('Doe the second');
         expect(res.body.givenName).to.eql('Johnathan');
         expect(res.body.id).to.eql(1);
       });
    });

    it('should return 404 NOT FOUND if user is not found', async () => {
      return request
       .get('/api/users/3')
       .set('Content-Type', 'application/json')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(404);
       });
    });

  });

  describe('GET /api/users', (): void => {

    it('should return 200 OK and return all the users', async () => {
      return request
       .get('/api/users')
       .set('Accept', 'application/json')
       .then(async (res) => {
         expect(res.status).to.equal(200);
         expect(res.body[0].email).to.eql('new@email.com');
         expect(res.body[0].familyName).to.eql('Doe the second');
         expect(res.body[0].givenName).to.eql('Johnathan');
         expect(res.body[0].id).to.eql(1);
       });
    });

  });

  describe('DELETE /api/users', (): void => {

    it('should return 200 OK and return all the users', async () => {
      return request
       .delete('/api/users/1')
       .then(async (res) => {
         expect(res.status).to.equal(204);
         const user = await User.findOne({ where: { id: 1 } });
         expect(user).to.equal(null);

       });
    });

  });

});
