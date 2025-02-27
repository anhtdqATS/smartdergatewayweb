import moment from "moment";

export const getXAxisConfig = (textLabelColor) => {
  return {
    type: "datetime",
    labels: {
      formatter: function () {
        var milliseconds = this.value / 1000;
        var formattedLocalDate = moment(milliseconds).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        return formattedLocalDate;
      },
      rotation: 0,
      align: "center",
      style: {
        color: textLabelColor, // Màu nhãn trục y
      },
    },
    tickPixelInterval: 60 * 4,
    minRange: 3 * 60 * 1000,
  };
};

export const tooltipFormatter = function () {
  // var milliseconds = this.x/ 1000;
  var formattedLocalDate = moment(this.x / 1000).format(
    "YYYY-MM-DD HH:mm:ss.SSS"
  );
  var formattedValue = this.y; // Giá trị của điểm dữ liệu

  var tooltip = `<strong>Time:</strong> ${formattedLocalDate}<br>`;
  tooltip += `<strong>Value:</strong> ${formattedValue}`;

  return tooltip;
};
