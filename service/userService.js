import { getUsersQuery, getUserByIdQuery, addUserQuery, deleteUserQuery, updateUserQuery } from './queryUser.js'
import { executeQuery } from './db.js';


export class UserService {

    async getUsers() {
        const query = getUsersQuery();
        const result = await executeQuery(query);
        return result;
    }

    async getUserById(id) {
        const query  = getUserByIdQuery();
        const result =  await executeQuery(query, [id]);
        return result;
    }
    
    async addUser(user) {
        const query = addUserQuery();
        const params = [user.userName ,user.email, user.address, user.phone];
        const result =  await executeQuery(query, params);
        return result;
    }

    async deleteUser(id) {
        const { query, params } = deleteUserQuery(id);
        const result =  await executeQuery(query, params);
        return result;
    }

    async updateUser(id, user) {
        const query = updateUserQuery(id, user);
        const result =  await executeQuery(query.updateQuery, query.params);
        return result;
    }
}