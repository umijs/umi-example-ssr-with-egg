'use strict';
const { join } = require('path');
const { createReadStream, createWriteStream } = require('fs');

const sourcePath = join(process.cwd(), 'app', 'public', 'manifest.json');
const destPath = join(process.cwd(), 'config', 'manifest.json');

createReadStream(sourcePath).pipe(
  createWriteStream(destPath)
);
