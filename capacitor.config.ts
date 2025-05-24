
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e885b912885e4310bc29a6e7badfd31a',
  appName: 'Karigar - Find Workers',
  webDir: 'dist',
  server: {
    url: 'https://e885b912-885e-4310-bc29-a6e7badfd31a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION']
    }
  }
};

export default config;
