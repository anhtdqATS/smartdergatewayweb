// loginApi.js
import repository from "@/Base/repository.js";

const resource = "/api/gw";

export default {
  getSettings(payload) {
    return repository.post(`${resource}`, payload);
  },
  createSerialForwarder(payload) {
    return repository.post(`${resource}`, payload);
  },
  updateSerialForwarder(payload) {
    return repository.post(`${resource}`, payload);
  },
  deleteSerialForwarder(payload) {
    return repository.post(`${resource}`, payload);
  },
  createTCPForwarder(payload) {
    return repository.post(`${resource}`, payload);
  },
  updateTCPForwarder(payload) {
    return repository.post(`${resource}`, payload);
  },
  deleteTCPForwarder(payload) {
    return repository.post(`${resource}`, payload);
  },
};
