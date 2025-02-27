import repository from "@/Base/repository.js";
import { GatewayServiceId } from "@/Constants/index.js";

const baseComposable = (channelId = GatewayServiceId) => {
  const currentTime = ref(0);
  const timeNow = async () => {
    try {
      const dataLoad = {
        receiver: channelId,
        payload: {
          cmdType: 4,
        },
      };
      const res = await repository.post("/api/gw", dataLoad);
      if (res.data.error.length > 0) {
        currentTime.value = Date.now();
      } else {
        currentTime.value = res.data.payload.time;
      }
    } catch (error) {
      console.error(error);
    }
  };

  function roundFloatValues(obj) {
    const roundedObject = {};
    for (const key in obj) {
      if (obj[key].v === null) {
        roundedObject[key] = {
          ...obj[key],
          v: "null", // Thay thế giá trị null bằng chuỗi "null"
        };
      } else {
        if (obj[key].type === "float") {
          const stringValue = obj[key].v.toString();
          const decimalIndex = stringValue.indexOf(".");
          if (decimalIndex !== -1) {
            let i = decimalIndex + 1;
            while (i < stringValue.length && stringValue[i] === "0") {
              i++;
            }
            roundedObject[key] = {
              ...obj[key],
              v: parseFloat(obj[key].v.toFixed(i - decimalIndex + 2)),
            };
          } else {
            roundedObject[key] = {
              ...obj[key],
              v: parseFloat(obj[key].v),
            };
          }
        } else {
          roundedObject[key] = obj[key];
        }
      }
    }
    return roundedObject;
  }
  function roundFloatNumber(num) {
    const stringValue = num.toString();
    const decimalIndex = stringValue.indexOf(".");
    if (decimalIndex !== -1) {
      let i = decimalIndex + 1;
      while (i < stringValue.length && stringValue[i] === "0") {
        i++;
      }
      return parseFloat(num.toFixed(i - decimalIndex + 2));
    } else {
      return parseFloat(num);
    }
  }

  const hexToFloat = (hex, swap = 0) => {
    hex = String(hex); // hex is string ?
    let byteArray = new Uint8Array(4);
    for (let i = 0; i < 4; ++i) {
      byteArray[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }

    if (swap !== 0) {
      byteArray.reverse();
    }

    let view = new DataView(byteArray.buffer);
    return view.getFloat32(0, true); // 'true' is byte little-endian
  };

  const numberToFloatHex = (numberValue, swap = 0) => {
    let floatValue = new Float32Array([numberValue])[0];
    let byteArray = new Uint8Array(4);
    let view = new DataView(byteArray.buffer);
    view.setFloat32(0, floatValue, true); // Tham số thứ ba 'true' chỉ định thứ tự byte little-endian

    if (swap !== 0) {
      byteArray.reverse();
    }

    let hex = Array.from(byteArray)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hex.toUpperCase();
  };

  const hexToDouble = (hex, swap = 0) => {
    hex = String(hex); // Đảm bảo hex là một chuỗi
    let byteArray = new Uint8Array(8); // Sử dụng 8 byte cho Float64
    for (let i = 0; i < 8; ++i) {
      byteArray[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    }

    if (swap !== 0) {
      byteArray.reverse();
    }

    let view = new DataView(byteArray.buffer);
    return view.getFloat64(0, true); // Tham số thứ hai 'true' chỉ định thứ tự byte little-endian
  };

  const numberToDoubleHex = (numberValue, swap = 0) => {
    let doubleValue = parseFloat(numberValue);
    let byteArray = new Uint8Array(8); // Sử dụng 8 byte cho Float64
    let view = new DataView(byteArray.buffer);
    view.setFloat64(0, doubleValue, true); // Tham số thứ ba 'true' chỉ định thứ tự byte little-endian

    if (swap !== 0) {
      byteArray.reverse();
    }

    let hex = Array.from(byteArray)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hex.toUpperCase();
  };

  return {
    currentTime,
    roundFloatValues,
    roundFloatNumber,
    timeNow,
    hexToFloat,
    numberToFloatHex,
    hexToDouble,
    numberToDoubleHex,
  };
};

export default baseComposable;
