import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLanConnect,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiInformationOutline,
  mdiPalette,
  mdiBookCogOutline,
  mdiArrangeBringForward,
  mdiVpn,
  mdiSignalCellular2,
  mdiLan,
  mdiCogOutline,
  mdiChartMultiple,
} from "@mdi/js";

export default [
  {
    permissions: ["admin", "engineer"],
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  {
    permissions: ["admin", "engineer"],
    to: "/channel",
    label: "Channel",
    icon: mdiBookCogOutline,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/mapping",
    label: "Mapping",
    icon: mdiLanConnect,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/chartViewer",
    label: "Chart Viewer",
    icon: mdiChartMultiple,
  },
  {
    permissions: ["admin", "engineer"],
    label: "Logs",
    icon: mdiViewList,
    menu: [
      {
        permissions: ["admin", "engineer"],
        to: "/sessionLog",
        label: "Session Log",
      },
      {
        permissions: ["admin", "engineer"],
        to: "/serviceLog",
        label: " Service Log",
      },
    ],
  },

  {
    permissions: ["admin", "engineer"],
    to: "/forwarder",
    label: "Forwarder",
    icon: mdiArrangeBringForward,
  },
  {
    permissions: ["admin", "engineer"],
    label: "VPN",
    icon: mdiVpn,
    menu: [
      {
        permissions: ["admin", "engineer"],
        to: "/openVPN",
        label: "Open VPN",
      },
      // {
      //   permissions: ["admin", "engineer"],
      //   to: "/ipsecVPN",
      //   label: "Ipsec VPN",
      // },
    ],
  },
  {
    permissions: ["admin", "engineer"],
    to: "/network",
    label: "Network",
    icon: mdiLan,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/cellular",
    label: "Cellular",
    icon: mdiSignalCellular2,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/profile",
    label: "Profile",
    icon: mdiAccountCircle,
  },
  {
    permissions: ["admin", "engineer"],
    label: "Information",
    icon: mdiInformationOutline,
    menu: [
      {
        permissions: ["admin", "engineer"],
        to: "/About",
        label: "About",
      },
      {
        permissions: ["admin", "engineer"],
        to: "/license",
        label: "License",
      },
    ],
  },
  {
    permissions: ["admin", "engineer"],
    label: "Device",
    icon: mdiCogOutline,
    menu: [
      {
        permissions: ["admin", "engineer"],
        to: "/system",
        label: "System",
      },
      {
        permissions: ["admin", "engineer"],
        to: "/import-export",
        label: "Import/Export",
      },
      {
        permissions: ["admin", "engineer"],
        to: "/update-firmware",
        label: "Update Firmware",
      },
    ],
  },
];
