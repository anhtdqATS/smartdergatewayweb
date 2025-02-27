import repository from "@/Base/repository.js";

const resource = "/api/gw";

export default {
  //Find Object Names
  getDashboardData(payload) {
    return repository.post(`${resource}`, payload);
  },
  getDashboardChannel(payload) {
    return repository.post(`${resource}`, payload);
  },
};
