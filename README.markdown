# Shapeshifter.js
Shapeshifter is a small library that simplifies executing javascript based on media queries. **PLEASE NOTE: This is super alpha and is untested.**

## Usage

    var smallScreens = new Shapeshifter("min-width 320px", onQueryTrue, onQueryFalse);

Just instantiate a new Shapeshifter object with a media query and function to run when the query becomes true and a function to run when the query becomes false.

These functions are evaluated on every resize and orientationchange event but are only run when the query has changed as opposed to running every resize and orientation change.

## Browser Support

Shapeshifter should work on any browser that supports mediaQueries and addEventListener.

Chrome 11+
Safari 4+
Firefox 4+
Internet Explorer 9+
Opera 10.6+
iOS 3.2+
Android 2.1+

## Caveats

Please keep in mind.

* shapeshifter.js does not work with respond.js
* There is no support for testing media types `screen`, `tv`, `print` in IE9