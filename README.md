ocr-js-json is a package that allows for ocr results. The current version fixes a bug.

Since the package uses tesseract.js to scan the data, when using its important to import tesseract.js too.

With:

var tesseract = require('tesseract.js');


Docs


Use the package by doing this:

var tesseract = require('tesseract.js');

var ocr-js-json = require('ocr-js-json');

var shl = data;

api(shl)


It will console.log the text.


Thanks for using my package! 

PS: You Can see my package on https://www.npmjs.com/package/ocr-js-json
