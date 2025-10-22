module.exports = {
  preset: "react-native",
  verbose: true,
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "^expo-secure-store$": "<rootDir>/__mocks__/expo-secure-store.js",
    "^@/(.*)$": "<rootDir>/src/$1",
    "expo-modules-core": "<rootDir>/__mocks__/expo-modules-core.js", // Mock expo-modules-core
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native" +
    "|@react-native" +
    "|@react-navigation" +
    "|@testing-library" +
    "|expo-secure-store" +
    "|expo-modules-core" +
    "|expo-router" + // Add expo-router to be transformed
    "|react-native-css-interop" + // Add react-native-css-interop to be transformed
    "|expo" + // Add expo to be transformed
    "|expo-asset" + // Add expo-asset to be transformed
    "|expo-constants" + // Add expo-constants to be transformed
    "|expo-linking" + // Add expo-linking to be transformed
      ")/)",
  ],
};
