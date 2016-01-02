/**
 * DigestionCSS
 *
 * @author Gabriel Jacinto aka. GabrielJMJ <gamjj74@hotmail.com>
 * @license MIT License
 */

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