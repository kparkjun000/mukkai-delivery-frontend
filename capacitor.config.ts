import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.mukkai.delivery",
  appName: "Mukkai Delivery",
  webDir: "dist",

  // 기존 Heroku 배포 URL 활용
  server: {
    url: "https://mukkai-delivery-fe-0bdb8680ab0d.herokuapp.com",
    cleartext: true,
  },

  ios: {
    contentInset: "automatic",
    scrollEnabled: true,
    backgroundColor: "#ffffff",
    allowsLinkPreview: false,
    handleApplicationNotifications: false,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: false,
    },
    StatusBar: {
      style: "default",
      backgroundColor: "#ffffff",
    },
  },
};

export default config;
