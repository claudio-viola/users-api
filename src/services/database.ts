import { User } from '../models/user';

/**
 * [createUser creates a new user record]
 * @return      [User instance]
 */
export function createUser (user) {
  return User.create(user);
}

/**
 * [updateUser description]
 * @param  userModel [the user instance being updated]
 * @param  user      [the attributes being updated]
 * @return           [description]
 */
export function updateUser (userInstance, user) {
  return userInstance.update(user);
}

/**
 * [findUser finds a user by its id]
 * @param  id [id to find]
 * @return    [Promise<User instance>]
 */
export function findUser (id: number) {
  return User.findOne({
    where: {
      id: id,
    },
  });
}

/**
 * [deleteUser deletes a user]
 * @param  id [id to delete]
 * @return    [Promise]
 */
export function deleteUser (id: number) {
  return User.destroy({
    where: {
      id: id,
    },
  });
}

/**
 * [findUsers retrieve all users]
 * @return [Promise<UserInstances[]>]
 */
export function findUsers () {
  return User.findAll();
}
