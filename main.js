var fs = require('fs');

var fileStructure = {
  name: 'root',
  files: [],
  folders: []
};

var currentPath = '/Users/sashakramer/workspace/read-file-structure';  // replace this with user input

var gitIgnorePath = currentPath + '/.gitignore';
var gitIgnoreContents = [];

// read .gitignore to ignore its contents in the file structure
if(fs.lstatSync(gitIgnorePath).isFile()){
  var gitIgnoreString = fs.readFileSync(gitIgnorePath, 'utf-8');
  gitIgnoreContents = gitIgnoreString.split('\n');
}

readFolder(currentPath, fileStructure);

console.log('fileStructure', fileStructure);

function readFolder(path, currentObject){

  var currentFolderContents = fs.readdirSync(path);

  currentFolderContents.map(function(x){
    if(x !== '.git'){
      var xPath = path + '/' + x;
      var isFolder = fs.lstatSync(xPath).isDirectory();
      if(!isFolder){
        currentObject.files.push(x);
      } else {
        var tempFolder = {
          name: x,
          files: [],
          folders: []
        };
        currentObject.folders.push(tempFolder);

        currentObject.folders.map(function(y){
          var yPath = path + '/' + y.name;
          readFolder(yPath, y);
        });
      }
    }
  });
}
