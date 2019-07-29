// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);

// import all svg
const req = require.context('./assets/icons', false, /\.svg$/);
requireAll(req);

const reqSvg = require.context('./assets/icons/svg', false, /\.svg$/);
requireAll(reqSvg);
