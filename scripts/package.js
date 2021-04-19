const fs = require('fs-extra');
const path = require('path');
const omit = require('lodash/omit');

const npmPackage = require('../package.json');

fs.mkdirpSync(path.resolve(__dirname, '../dist'));
fs.writeFileSync(path.resolve(__dirname, '../dist/package.json'), JSON.stringify(omit(npmPackage, 'scripts'), null, 2), 'utf-8');
