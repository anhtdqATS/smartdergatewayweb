import {
  mdiAccount,
  mdiCogOutline,
  mdiLogout,
  mdiThemeLightDark,
  mdiContentSaveMoveOutline,
} from "@mdi/js";

export default [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: "My Profile",
        to: "/profile",
      },
      {
        icon: mdiCogOutline,
        label: "Settings",
        to: "/settings",
      },
      {
        isDivider: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: "Light/Dark",
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiContentSaveMoveOutline,
    label: "save gateway",
    isSaveGateway: true,
    isDesktopNoLabel: true,
  },
  {
    icon: mdiLogout,
    label: "Log out",
    isDesktopNoLabel: true,
    isLogout: true,
  },
];
