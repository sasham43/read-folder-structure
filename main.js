var fs = require('fs');

var currentPath = '/Users/sashakramer/workspace/read-file-structure';
var currentFolder = fs.readdirSync(currentPath);
console.log('currentFolder:', currentFolder);
