import repository from "@/Base/repository.js";

const resource = "/api/gw";

export default {
  //deleteNode
  getChannelList(payload) {
    return repository.post(`${resource}`, payload);
  },
};
