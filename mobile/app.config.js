module.exports = ({ config }) => {
  const isOfficer = process.env.APP_VARIANT === 'officer' || process.env.APP_VARIANT === 'admin';

  if (isOfficer) {
    return {
      ...config,
      name: "Sagamu Remo Field Command",
      slug: "sagamu-remo-field-officer",
      scheme: "sagamu-officer",
      icon: "./assets/officer-icon.png",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#140a08",
      },
      android: {
        ...config.android,
        versionCode: 1,
        package: "com.sagamumo.fieldofficer",
        adaptiveIcon: {
          foregroundImage: "./assets/officer-adaptive-icon.png",
          backgroundColor: "#140a08",
        },
      },
      extra: {
        ...config.extra,
        appVariant: "officer",
      },
      plugins: [
        ...(config.plugins || []),
        "expo-font",
        "expo-asset"
      ]
    };
  }

  return {
    ...config,
    name: "Sagamu Remo Civic Portal",
    slug: "sagamu-portal",
    scheme: "sagamu-portal",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#1e3a8a",
    },
    android: {
      ...config.android,
      versionCode: 1,
      package: "com.sagamuremo.civicportal",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#1e3a8a",
      },
    },
    extra: {
      ...config.extra,
      appVariant: "citizen",
    },
    plugins: [
      ...(config.plugins || []),
      "expo-font",
      "expo-asset"
    ]
  };
};
