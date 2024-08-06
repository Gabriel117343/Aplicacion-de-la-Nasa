export default ({ config }) => {
  return {
    ...config,
    name: process.env.APP_ENV === 'production' ? 'NasaApp' : 'NasaApp-dev',
    ios: {
      ...config.ios,
      bundleIdentifier: process.env.APP_ENV === 'production' ? 'com.my.app' : 'com.my.app-dev',
    },
    android: {
      ...config.android,
      package: process.env.APP_ENV === 'production' ? 'com.my.app' : 'com.my.app.dev',
    },
    extra: {
      nasaApiKey: process.env.NASA_API_KEY,
      deeplApiKey: process.env.DEEPL_API_KEY,
      eas: {
        projectId: '2c40981d-4fe1-4d1e-a314-300a8aaa9e9a'
      },
      router: {
        origin: false
      }
    },
    runtimeVersion: {
      policy: 'appVersion'
    },
    updates: {
      url: 'https://u.expo.dev/2c40981d-4fe1-4d1e-a314-300a8aaa9e9a'
    }
  };
};