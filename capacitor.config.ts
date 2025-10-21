import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mukkai.delivery',
  appName: 'Mukkai Delivery',
  webDir: 'dist',

  server: {
    url: 'https://mukkai-delivery-fe-0bdb8680ab0d.herokuapp.com',
    cleartext: true
  },

  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
    backgroundColor: '#ffffff',
    allowsLinkPreview: false,
    handleApplicationNotifications: false,
    scheme: 'App',
    buildOptions: {
      developmentTeam: '5LCBBV4KNB',
      packageType: 'app-store'
    }
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: false
    },
    StatusBar: {
      style: "default",
      backgroundColor: "#ffffff"
    }
  }
};

export default config;
