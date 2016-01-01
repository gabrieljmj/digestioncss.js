digestioncss.js
================
![](https://img.shields.io/npm/v/digestioncss.svg)

Cleans up your HTML code from CSS.

## Install
```bash
$ npm install --save-dev digestioncss
```

## Usage
You have a HTML file
```html
<!-- file.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div id="hello" style="background:red">Hello!</div>
</body>
</html>
```
so you want take all styles attributes from HTML elements and put them on a CSS file. With **digestioncss.js**,
 just do that:
 ```js
var DigestionCSS = require('digestioncss');
 
new DigestionCSS().digest({
  file: 'file.html',
  dest: 'public/css/file.css'
});
 ```
 If the destination file already exists and is a CSS file, both will be joined. If not, it will be created. Also a link element referencing it will be added on the head of the HTML file.
 ```css
 #hello{background:red;}
 ```
 ```html
<!-- file.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="public/css/file.css" type="text/css">
</head>
<body>
  <div id="hello">Hello!</div>
</body>
</html>
```

### Saving HTML in a new file
Option to save your generated HTML in a new file.

```js
new DigestionCSS().digest({
  file: 'file.html',
  newFile: 'new-file.html' // Will keep `file.html`
  dest: 'public/css/file.css'
});
```

### Backup the original HTML
The option ```backupFile``` saves a backup from the original HTML.

```js
new DigestionCSS().digest({
  file: 'file.html',
  backupFile: 'backup-file.html'
  dest: 'public/css/file.css'
});
```

### Minifiers and beautifiers
There's options to enable beautifiers or minifiers for HTML and CSS. If the beautifier for a language is unabled, so it will be minified and vise-versa.

#### Beautify
Language|Default value
--------|-------------
HTML|```true```
CSS|```false```

#### Minify
Language|Default value
--------|-------------
HTML|```false```
CSS|```true```

#### Example
```js
new DigestionCSS().digest({
  file: 'file.html',
  dest: 'public/css/file.css',
  beautify: {
    html: false,
    css: true
  }
});
```

## Command line
You can use via command line also.
### ```digestioncss.json```
You can create a file with several files that you want to cleans up from CSS.
```json
{
    "files": [
        {
            "file": "foo.html",
            "dest": "css/foocss.css"
        },
        {
            "file": "bar.html",
            "dest": "css/barcss.css",
            "minify": {
                "html": true
            }
        }
    ]
}
```

```bash
$ digestioncss
```

### Without JSON file
Basic:
```bash
$ digestioncss foo.html css/foocss.css
```
#### Options
Option | Description
------- | ---------
```-n <file>```/```--new_file <file>``` | Sends the new HTML to another file.
```-b <file>```/```--backup_file <file>``` | Saves a backup from the original HTML.
```--minify_css``` | Enable minifier for CSS.
```--minify_html``` | Enable minifier for HTML.
```--beautify_css``` | Enable beautifier for CSS.
```--beautify_html``` | Enable beautifier for HTML.

# License
[MIT License](https://github.com/gabrieljmj/digestioncss.js/blob/master/LICENSE.md) 2015 © Gabriel Jacinto.