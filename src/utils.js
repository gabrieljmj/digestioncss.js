var fs = require('fs');

module.exports = {
  file: {
    exists: function (file) {
      try {
        return fs.statSync(file).isFile();
      } catch (e) {
        return false;
      }
    }
  }
};