var fs = require('fs');

var fileStructure = {
  name: 'root',
  files: [],
  folders: []
};

var currentPath = '/Users/sashakramer/workspace/read-file-structure';  // replace this with user input

readFolder(currentPath, fileStructure);

console.log('fileStructure', fileStructure);

function readFolder(path, currentObject){

  //console.log('currentObject', fileStructure);
  var currentFolderContents = fs.readdirSync(path);
  //console.log('currentFolderContents:', currentFolderContents);

  currentFolderContents.map(function(x){
    //console.log('x:', x);
    var xPath = path + '/' + x;
    //console.log('xPath:', xPath);
    var isFolder = fs.lstatSync(xPath).isDirectory();
    //console.log('isFolder:', isFolder);
    if(!isFolder){
      console.log('x:', x);
      currentObject.files.push(x);
    } else {
      var tempFolder = {
        name: x,
        files: [],
        folders: []
      };

      currentObject.folders.push(tempFolder);
      //var newPath = path + '/' + x;
      //console.log('currentObject.folders:', currentObject.folders);
      currentObject.folders.map(function(y){
        console.log('y:', y);
        var yPath = path + '/' + y.name;
        readFolder(yPath, y);
      });
      //readFolder(newPath, currentObject.folders[x]);
    }
  });
  console.log('currentObject:', currentObject);
}
