const fs = require('fs').promises;
const path = require('path');
const message = require('../handler/message');

async function loadRoutes(app, baseDirectory) {
  const entries = await fs.readdir(baseDirectory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const fullPath = path.join(baseDirectory, entry.name);
      const files = await fs.readdir(fullPath);

      for (const file of files) {
        if (path.extname(file) === '.js') {
          const routePath = path.join(fullPath, file);
          const route = require(routePath);

          if (!route || typeof route !== 'function') {
            message.err(`Error: The file "${file}" does not export a valid route.`);
            continue;
          }

          const routeName = file.replace('.js', '');
          const pathPrefix = route.includeDirInRoute ? `/${entry.name}` : '';
          app.use(`${pathPrefix}/${routeName}`, route);
          message.notify(`Route loaded: ${pathPrefix}/${routeName}`);
        }
      }
    } else if (entry.isFile() && path.extname(entry.name) === '.js') {
      const routePath = path.join(baseDirectory, entry.name);
      const route = require(routePath);

      if (!route || typeof route !== 'function') {
        message.err(`Error: The file "${entry.name}" does not export a valid route.`);
        continue;
      }

      const routeName = entry.name.replace('.js', '');
      const pathPrefix = route.includeDirInRoute ? '' : '/';
      app.use(`${pathPrefix}${routeName}`, route); 
      message.notify(`Route loaded: ${pathPrefix}${routeName}`);
    }
  }

  message.success('All routes loaded successfully.');
}

module.exports = loadRoutes;
