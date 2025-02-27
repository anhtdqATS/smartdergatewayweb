import { defineStore } from "pinia";
import { getXAxisConfig, tooltipFormatter } from "@/Base/formatChart.js";
import { useStyleStore } from "@/stores/style.js";
import { lightModeColors, darkModeColors } from "@/Base/colorChart.js";
import { computed } from "vue";
import { useHomeStore } from "./homeStore";

export const useClockMeaStore = defineStore("gaugeMeaChart", () => {
  const homeStore = useHomeStore();

  const styleStore = useStyleStore();
  const colors = computed(() => {
    return styleStore.darkMode ? darkModeColors : lightModeColors;
  });

  const reactivePowerData = computed(() => {
    return [homeStore.roundFloatNumber(homeStore.POI.PM_Q)];
  });
  const activePowerData = computed(() => {
    return [homeStore.roundFloatNumber(homeStore.POI.PM_P)];
  });

  const volgateData = computed(() => {
    return [homeStore.roundFloatNumber(homeStore.POI.PM_V)];
  });

  const Pnom = computed(() => {
    return homeStore.PlantInfo.Pnom;
  });
  const Qnom = computed(() => {
    return -homeStore.PlantInfo.Pnom;
  });
  const Vnom = computed(() => {
    return homeStore.PlantInfo.Vnom;
  });

  const chartOptionsBase = computed(() => ({
    chart: {
      type: "gauge",
      height: "100%",
      // margin: 0, // Loại bỏ margin xung quanh đồ thị
      spacingTop: 0, // Khoảng cách trên đồ thị
      spacingBottom: 0, // Khoảng cách dưới đồ thị
      plotBorderWidth: 0,
      marginBottom: -30,
      backgroundColor: colors.value.background,
    },
    title: null,
    colors: colors.value.series,
    pane: {
      size: "90%",
      center: ["50%", "75%"],
      startAngle: -90,
      endAngle: 90,
      background: null,
    },
    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },
    yAxis: {
      // tickPixelInterval: 72,
      // tickPosition: "inside",
      tickLength: 0,
      // tickWidth: 0,
      tickColor: colors.value.gridLineColor,
      minorTickInterval: null,
      gridLineColor: colors.value.gridLineColor,
      labels: {
        enabled: false,
        distance: 20,
        style: {
          fontSize: "14px",
          color: colors.value.gridLineColor,
        },
      },
      lineWidth: 0,
    },
    plotOptions: {
      gauge: {
        dataLabels: {
          y: 1000,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
  }));

  var reactivePowerOptions = computed(() => {
    return Object.assign({}, chartOptionsBase.value, {
      yAxis: Object.assign({}, chartOptionsBase.value.yAxis, {
        min: Qnom.value,
        max: Pnom.value,
        title: {
          text: "Reactive Power",
          y: -70,
          style: {
            color: colors.value.textLabel,
            fontSize: "20px",
            fontWeight: "bold",
          },
        },
        plotBands: [
          {
            from: Qnom.value,
            to: 0,
            color: "#429e24 ", // green
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
          {
            from: 0,
            to: Pnom.value,
            color: "#ffb40a", // yellow
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
        ],
      }),

      credits: {
        enabled: false,
      },

      series: [
        {
          name: "Reactive Power",
          data: reactivePowerData.value,
          dataLabels: {
            enabled: false,
            format:
              '<div class="">' +
              '<span style="font-size:26px" class=" text-blue-500 dark:text-lime-500">{y}</span>' +
              '<span style="font-size:16px;opacity:0.6" class="dark:text-[#f1f5f9]">' +
              " kVAr" +
              "</span>" +
              "</div>",
          },
          tooltip: {
            valueSuffix: " kVAr",
            color: colors.value.textLabel,
          },
          dial: {
            radius: "80%",
            backgroundColor: "gray",
            baseWidth: 12,
            baseLength: "0%",
            rearLength: "0%",
          },
          pivot: {
            backgroundColor: "gray",
            radius: 6,
          },
        },
      ],
    });
  });
  var activePowerOptions = computed(() => {
    return Object.assign({}, chartOptionsBase.value, {
      yAxis: Object.assign({}, chartOptionsBase.value.yAxis, {
        min: 0,
        max: Pnom.value,
        title: {
          text: "Active Power",
          y: -80,
          style: {
            color: colors.value.textLabel,
            fontSize: "24px",
            fontWeight: "bold",
          },
        },
        plotBands: [
          {
            from: 0,
            to: Pnom.value / 2,
            color: "#429e24 ", // green
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
          {
            from: Pnom.value / 2,
            to: (8 / 10) * Pnom.value,
            color: "#ffb40a", // yellow
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
          {
            from: (8 / 10) * Pnom.value,
            to: Pnom.value,
            color: "#f04d4d", // red
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
        ],
      }),
      pane: Object.assign({}, chartOptionsBase.value.pane, {
        size: "110%",
      }),
      credits: {
        enabled: false,
      },

      series: [
        {
          name: "Active Power",
          data: activePowerData.value,
          dataLabels: {
            enabled: false,
            format:
              '<div class="">' +
              '<span style="font-size:30px" class=" text-blue-500 dark:text-lime-500">{y}</span>' +
              '<span style="font-size:18px;opacity:0.6" class="dark:text-[#f1f5f9]">' +
              " kVAr" +
              "</span>" +
              "</div>",
          },
          tooltip: {
            valueSuffix: " kW",
          },
          dial: {
            radius: "80%",
            backgroundColor: "gray",
            baseWidth: 12,
            baseLength: "0%",
            rearLength: "0%",
          },
          pivot: {
            backgroundColor: "gray",
            radius: 6,
          },
        },
      ],
    });
  });

  var voltageOptions = computed(() => {
    return Object.assign({}, chartOptionsBase.value, {
      yAxis: Object.assign({}, chartOptionsBase.value.yAxis, {
        min: Vnom.value - Vnom.value / 5,
        max: Vnom.value + Vnom.value / 5,
        title: {
          text: "Voltage",
          y: -70,
          style: {
            color: colors.value.textLabel,
            fontSize: "20px",
            fontWeight: "bold",
          },
        },
        plotBands: [
          {
            from: Vnom.value - Vnom.value / 5,
            to: Vnom.value - Vnom.value / 10,
            color: "#f04d4d", // red
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
          {
            from: Vnom.value - Vnom.value / 10,
            to: Vnom.value - Vnom.value / 20,
            color: "#ffb40a", // yellow
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
          {
            from: Vnom.value - Vnom.value / 20,
            to: Vnom.value + Vnom.value / 20,
            color: "#429e24 ", // green
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
          {
            from: Vnom.value + Vnom.value / 20,
            to: Vnom.value + Vnom.value / 10,
            color: "#ffb40a", // yellow
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
          {
            from: Vnom.value + Vnom.value / 10,
            to: Vnom.value + Vnom.value / 5,
            color: "#f04d4d", // red
            thickness: "50%",
            borderWidth: 4, // Độ rộng của đường viền
            borderColor: colors.value.background, // Màu của đường viền
          },
        ],
      }),

      credits: {
        enabled: false,
      },

      series: [
        {
          name: "Voltage",
          data: volgateData.value,
          y: 30,
          dataLabels: {
            y: 300,
            enabled: false,
            format:
              '<div class="">' +
              '<span style="font-size:26px" class=" text-blue-500 dark:text-lime-500">{y}</span>' +
              '<span style="font-size:16px;opacity:0.6" class="dark:text-[#f1f5f9]">' +
              " kVAr" +
              "</span>" +
              "</div>",
          },
          tooltip: {
            valueSuffix: " kV",
          },
          dial: {
            radius: "80%",
            backgroundColor: "gray",
            baseWidth: 12,
            baseLength: "0%",
            rearLength: "0%",
          },
          pivot: {
            backgroundColor: "gray",
            radius: 6,
          },
        },
      ],
    });
  });

  return {
    reactivePowerOptions,
    activePowerOptions,
    voltageOptions,
  };
});
