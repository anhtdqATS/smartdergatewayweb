// loginApi.js
import repository from "@/Base/repository.js";

const resource = "/api/gw";

export default {
  getMachineCode(payload) {
    return repository.post(`${resource}`, payload);
  },
  getLicenseInfo(payload) {
    return repository.post(`${resource}`, payload);
  },
  updateLicense(payload) {
    return repository.post(`${resource}`, payload);
  },
};
