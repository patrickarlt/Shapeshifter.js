# Shapeshifter.js
Shapeshifter is a small library that simplifies executing javascript based on media queries using the `matchMedia` specification. This library provides a simple interface and works around some browser bugs detailed here http://www.nczonline.net/blog/2012/01/19/css-media-queries-in-javascript-part-2/.

# Usage

## Simple
```javascript
Shapeshifter.on(mediaQuery, function(){
  // This will run every time the media query has been true. 
});
```

## Once
```javascript
Shapeshifter.once(mediaQuery, function(){
  // This will run once the media query has been true. 
});
```

## State Manager
```javascript
Shapeshifter.watch(mediaQuery, {
  active: function(){
    // This will run every time the media query becomes true
  },
  inactive: function(){
    // This will run every time the media query becomes false
  }
});
```

## Stopping
```javascript
Shapeshifter.stop(mediaQuery);
```

# Browser Support

Shapeshifter.js should work on any browser that supports media queries and `matchMedia`.

* Chrome 11+
* Safari 4+
* Firefox 4+
* Internet Explorer 9+
* Opera 10.6+
* iOS 3.2+
* Android 2.1+

# Caveats

* shapeshifter.js does not work with respond.js
* There is no support for testing media types `screen`, `tv`, `print` in IE9

# Special Thanks
Special thanks to Scott Jehl and Paul Irish for the `window.matchMedia` polyfill.