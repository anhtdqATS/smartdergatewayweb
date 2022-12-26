import {
  mdiAccountCircle,
  mdiMonitor,
  mdiLanConnect,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiPalette,
  mdiBookCogOutline,
  mdiArrangeBringForward,
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
    to: "/tables",
    label: "Tables",
    icon: mdiTable,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/forms",
    label: "Forms",
    icon: mdiSquareEditOutline,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/ui",
    label: "UI",
    icon: mdiTelevisionGuide,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/forwarder",
    label: "Forwarder",
    icon: mdiArrangeBringForward,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/",
    label: "Styles",
    icon: mdiPalette,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/profile",
    label: "Profile",
    icon: mdiAccountCircle,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/",
    label: "Login",
    icon: mdiLock,
  },
  {
    permissions: ["admin", "engineer"],
    to: "/error",
    label: "Error",
    icon: mdiAlertCircle,
  },
  {
    permissions: ["admin", "engineer"],
    label: "Dropdown",
    icon: mdiViewList,
    menu: [
      {
        permissions: ["admin", "engineer"],
        label: "Item One",
      },
      {
        permissions: ["admin", "engineer"],
        label: "Item Two",
      },
    ],
  },
];
