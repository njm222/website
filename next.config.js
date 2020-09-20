// const withPWA = require('next-pwa');

// module.exports = withPWA({
//   crossOrigin: 'anonymous',
//   pwa: {
//     dest: 'public',
//   },
// });

const withTM = require('next-transpile-modules')(['drei', 'three', 'postprocessing']);

module.exports = withTM();
