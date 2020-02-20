import {
  createUser,
  deleteUser,
  findUser,
  findUsers,

  updateUser,
} from '../services/database';
import { CreateUser, UpdateUser } from './interfaces';

/**
 * [create a user]
 * @param  req  [express req]
 * @param  res  [express res]
 * @return      [void]
 */
export async function create (req, res) {
  try {
    const body = <CreateUser> req.body;
    await createUser(body);

    return res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
}

/**
 * [updates a user]
 * @param  req  [express req]
 * @param  res  [express res]
 * @return      [void]
 */
export async function update (req, res) {
  try {
    const body = <UpdateUser> req.body;
    const user = await findUser(req.params.id);
    if (user === null) {
      return res.sendStatus(404);
    }

    await updateUser(user, body);

    return res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
}

/**
 * [retrieves a user]
 * @param  req  [express req]
 * @param  res  [express res]
 */
export async function get (req, res) {
  try {
    const user = await findUser(req.params.id);
    if (user === null) {
      return res.sendStatus(404);
    }

    return res.send(user.get());
  } catch (err) {
    res.sendStatus(500);
  }
}

/**
 * [retrieves all Users]
 * @param  req  [express req]
 * @param  res  [express res]
 */
 // tslint:disable-next-line
export async function getAll (req, res) {
  try {
    const users = await findUsers();

    return res.send(users.map(user => user.get()));
  } catch (err) {
    res.sendStatus(500);
  }
}

/**
 * [deletes a user]
 * @param  req  [express req]
 * @param  res  [express res]
 */
// tslint:disable-next-line
export async function remove(req, res) {
  try {
    await deleteUser(req.params.id);

    return res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
}
