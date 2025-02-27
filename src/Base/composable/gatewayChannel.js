import { GatewayServiceId } from "@/Constants/index.js";
import baseApi from "../common/baseApi";

const baseGatewayChannel = () => {
  const getChannels = async () => {
    const dataGetChannelList = {
      receiver: GatewayServiceId,
      payload: {
        cmdType: 21,
      },
    };
    return await baseApi
      .getChannelList(dataGetChannelList)
      .then((res) => {
        if (res.data.error.length > 0) {
          ElMessage({
            message: "Data not return",
            showClose: true,
            grouping: true,
            type: "error",
          });
        } else {
          return res.data.payload;
        }
      })
      .catch((err) => {
        ElMessage({
          message: err.error,
          grouping: true,
          showClose: true,
          type: "error",
        });
      });
  };

 

  return {
    getChannels,

  };
};

export default baseGatewayChannel;
