const fs = require('fs');

const folderPath = 'node_modules/.cache';

fs.rm(folderPath, { recursive: true }, (err) => {
  if (err) {
    console.error(`Error removing cache: ${err.message}`);
  } else {
    console.log('Cache removed successfully.');
  }
});
