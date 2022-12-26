// loginApi.js
import repository from "@/Base/repository.js";

const resource = "/api/auth/user";

export default {
  getListUser() {
    return repository.get(`${resource}`);
  },
  addUser(payload) {
    return repository.post(`${resource}`, payload);
  },
  updateUser(payload) {
    return repository.put(`${resource}`, payload);
  },
  deleteUser(payload) {
    return repository.delete(`${resource}`, payload);
  },
};
