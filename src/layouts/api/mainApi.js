// loginApi.js
import repository from "@/Base/repository.js";

const resource = "/api/auth/logout";
const PING = "/api/ping";
const gw = "/api/gw";
export default {
  logout() {
    return repository.get(`${resource}`);
  },
  ping() {
    return repository.get(`${PING}`);
  },
  save(payload) {
    return repository.post(`${gw}`, payload);
  },
  removeAuthorizationHeaders(token) {
    repository.defaults.headers.common["Authorization"] = "";
  },
};
