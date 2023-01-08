export default {
  convertDateTimeToString(t) {
    let dateTimeConvert = new Date(t / 1000);
    let date = dateTimeConvert.toLocaleDateString();
    let time = dateTimeConvert.toLocaleTimeString("es-AR");
    let ms = dateTimeConvert.getMilliseconds();
    let result = date + " " + time + "." + ms;
    return result;
  },
};
