import repository from "@/Base/repository.js";

const resource = "/api/gw";

export default {
  getGatewayInfo(payload) {
    return repository.post(`${resource}`, payload);
  },
  setGatewayInfo(payload) {
    return repository.post(`${resource}`, payload);
  },
};
