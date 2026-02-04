const { getDefaultConfig } = require("expo/metro-config");
module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  // Add customizations here if needed, e.g. modify resolver/sourceExts/assetExts
  return config;
})();

const config = getDefaultConfig(__dirname);
// Add customizations here if needed, e.g. modify resolver/sourceExts/assetExts

module.exports = config;
  