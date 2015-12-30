var jsdom = require('jsdom'),
  fs = require('fs'),
  utils = require('./utils'),
  CleanCSS = require('clean-css');

var digestioncss = function () {};

digestioncss.prototype.digest = function (config) {
  // Validates the configs (file, dest)
  validateConfig(config);

  // Allows interate on DOM of the file
  jsdom.env(config.file, [], function (err, window) {
    var document = window.document,
      elements = document.querySelectorAll('*[style][id]'),
      styles = {};

    if (!!elements.length) {
      for (var k in elements) {
        var el = elements[k];

        if (el.id != '') {
          styles[el.id] = el.getAttribute('style');
          el.removeAttribute('style');
        }
      }

      var style = '';

      for (var k in styles) {
        style += '#' + k + '{' + styles[k] + '}';
      }

      if(utils.file.exists(config.dest)) {
        style = fs.readFileSync(config.dest) + style;
      }

      // Saves the CSS file
      fs.writeFile(config.dest, createCss(config, style), function (err) {
        if (err) {
          console.error(err);
        }
      });

      // Creates a link element with the CSS file
      if (!document.querySelectorAll('link[href="' + config.dest + '"]').length) {
        var link = createLink(document, config.dest);
        document.head.appendChild(link);
      }

      // Insert the link in the head of the file and save
      fs.writeFile(config.newFile || config.file, createHtml(config, '<!DOCTYPE html>' + document.documentElement.outerHTML), function (err) {
        if (err) {
          throw Error(err);
        }
      });
    }
  });
}

/**
 * Validates the configs of digestion
 *
 * @param {Object} config
 */
function validateConfig (config) {
  var validConfigs = ['file', 'newFile', 'dest', 'beautify', 'minify'];

  for (var k = 0, keys = Object.keys(config), len = keys.length; k < len; k++) {
    if (validConfigs.indexOf(keys[k]) <= -1) {
      throw Error(keys[k] + ' is an invalid option');
    }
  }

  if (typeof config.file == 'undefined') {
    throw Error('\'file\' option is necessary');
  } else if (typeof config.file == 'undefined') {
    throw Error('\'dest\' option is necessary');
  }

  if (!utils.file.exists(config.file)) {
    throw Error('File not found: ' + config.file);
  }

  if (typeof config.file !== 'string') {
    throw Error('\'file\' option must be string type');
  } else if (typeof config.dest !== 'string') {
    throw Error('\'dest\' option must be string type');
  }

  if (typeof config.beautify != 'undefined' && typeof config.minify != 'undefined') {
    if (typeof config.beautify.html != 'undefined'
      && typeof config.minify.html != 'undefined'
      && config.beautify.html && config.minify.html
    ) {
      throw Error('Is not possible beautify and minify the HTML code');
    }

    if (typeof config.beautify.css != 'undefined'
      && typeof config.minify.css != 'undefined'
      && config.beautify.css && config.minify.css
    ) {
      throw Error('Is not possible beautify and minify the CSS code');
    }
  }
}

/**
 * Creates the string minified of the CSS destination file
 *
 * @param {String} css
 *
 * @return {String}
 */
function createCss (config, css) {
  var newCss = '/**\n * Generated with digestion\n *\n * @date ' + new Date() + '\n */\n\n';

  newCss += 
  typeof config.beautify != 'undefined'
  && typeof config.beautify.css != 'undefined'
  && config.beautify.css 
    ? require('js-beautify').css(new CleanCSS().minify(css).styles) 
    : new CleanCSS().minify(css).styles;

  return newCss;
};

function createHtml (config, html) {
  var newHtml = 
  typeof config.minify != 'undefined'
  && typeof config.minify.html != 'undefined'
  && config.minify.html 
    ? require('html-minifier').minify(html) 
    : require('js-beautify').html(html);

  return newHtml;
}

/**
 * Creates the link element of head
 *
 * @param {Object} document
 * @param {String} href
 *
 * @return {Object}
 */
function createLink (document, href) {
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', href);
  link.setAttribute('type', 'text/css');

  return link;
}

module.exports = digestioncss;