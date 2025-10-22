module.exports = {
  NativeModulesProxy: {},
  // Add other exports if needed by the modules that depend on expo-modules-core
  // For example, if a module tries to access NativeModulesProxy.ExpoLocalization, you might add:
  // NativeModulesProxy: {
  //   ExpoLocalization: {
  //     getLocalizationAsync: jest.fn(),
  //   },
  // },
  Platform: {
    OS: 'web', // Mock a platform, e.g., 'web', 'ios', 'android'
    select: ({ web, ios, android }) => web,
  },
  requireNativeModule: () => ({}),
  requireOptionalNativeModule: () => ({}), // Added this line
  // Mock any other exports that are causing issues
};
