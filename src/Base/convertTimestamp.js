import moment from "moment";

export default {
  convertNsToDateTime(t) {
    if (t !== null && !isNaN(t)) {
      const totalMicroseconds = t;
      const totalMilliseconds = Math.floor(totalMicroseconds / 1000);
      const microseconds = totalMicroseconds % 1000; // Phần microseconds còn lại

      const date = new Date(totalMilliseconds);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      const ms = String(date.getMilliseconds()).padStart(3, "0");
      const us = String(microseconds).padStart(3, "0"); // Đảm bảo có 3 chữ số cho microseconds

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms}${us}`;
    } else {
      return "None";
    }
  },

  convertDateTimeToString(t) {
    if (t !== null) {
      let dateTimeConvert = new Date(t / 1000);
      // let date = dateTimeConvert.toLocaleDateString();
      let time = dateTimeConvert.toLocaleString("es-GB", { hour12: false });
      let ms = dateTimeConvert.getMilliseconds().toString().padStart(3, "0");
      let result = time + "." + ms;
      return result;
    } else {
      return "None";
    }
  },
  renderListValue(data) {
    let array = [];
    for (const entry of Object.entries(data)) {
      const [key, value] = entry;
      let v = 0;
      if (value) {
        v = 1;
      } else {
        v = 0;
      }
      array.push(key + "=" + v + ",");
    }
    return array;
  },

  renderListCommand(data) {
    if (data) {
      let array = [];
      for (const entry of Object.entries(data)) {
        const [key, value] = entry;

        array.push(key + "=" + value + ",");
      }
      return array;
    }
    return "None";
  },
};
