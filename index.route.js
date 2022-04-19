const express = require('express');
const glob = require('glob');
const path = require('path');
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// Mount routes defined in *.route.js files
mountRoutes();


// Mounts all routes defined in *.routes.js files in server/
function mountRoutes() {
  // Route definitions
  const files = glob.sync('./server/**/*.route.js');

  // Mount routes for each file
  files.forEach((routeFilename) => {
    const routes = require(`./${routeFilename}`); // eslint-disable-line global-require

    // Create the url using the first part of the filename
    // e.g. auth.route.js will generate /auth
    const routeName = path.basename(routeFilename, '.route.js');
    const url = `/${routeName}`;

    // Mount the routes
    console.info(`${path.basename(routeFilename)} -> ${url}`); // eslint-disable-line no-console
    router.use(url, routes);
  });
}

module.exports = router;
