/*
* Shapeshifter.js - make binding function to media queries easy
* primary author: Patrick Arlt
* Copyright (c) 2011 Patrick Arlt
* MIT license
*/

var Shapeshifter = function (query, options) {

  defaults = {
    testImmediately: true,
    callbackActive: function(){},
    callbackInactive: function(){}
  }

  function merge(obj1, obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }

  var object = function () {
    var self = this;

    this.query = query;
    
    this.options = merge(defaults, options);
    
    this.state = false;

    this.callback = {
      active : this.options.callbackActive,
      inactive : this.options.callbackInactive
    };

    this.remove = function () {
      window.removeEventListener('resize', this.exec);
      window.removeEventListener('onorientationchange', this.exec);      
    };

    this.exec = function () {
      test = window.matchMedia(self.query).matches;
      bool = (typeof test === 'boolean') ? test : test.matches;
      
      //is the query active?
      if (bool) {
        //State Change
        if (!self.state) { self.callback.active(); }
        self.state = true;
      } else {
        //State Change
        if (self.state) { self.callback.inactive(); }
        self.state = false;
      }
    };

    this.init = function(){
      test = window.matchMedia(self.query).matches;
      
      this.state = (typeof test == 'boolean') ? test : test.matches;
      
      if(this.state){
        self.callback.active();
      } else {
        self.callback.inactive();
      }
    };

    window.addEventListener('resize', this.exec);
    window.addEventListener('orientationchange', this.exec);
    
    if(this.options.testImmediately){
      this.init();
    }
 
  };

  return new object();

};

/*
* matchMedia() polyfill - test whether a CSS media type or media query applies
* primary author: Scott Jehl
* Copyright (c) 2010 Filament Group, Inc
* MIT license
* adapted by Paul Irish to use the matchMedia API
* http://dev.w3.org/csswg/cssom-view/#dom-window-matchmedia
* which webkit now supports: http://trac.webkit.org/changeset/72552
*
* Doesn't implement media.type as there's no way for crossbrowser property
* getters. instead of media.type == 'tv' just use media.matchMedium('tv')
*/

if ( !(window.matchMedia) ){
  
  window.matchMedia = (function(doc,undefined){
    
    var cache = {},
        docElem = doc.documentElement,
        fakeBody = doc.createElement('body'),
        testDiv = doc.createElement('div');
    
    testDiv.setAttribute('id','ejs-qtest');
    fakeBody.appendChild(testDiv);
    
    return function(q){
      if (cache[q] === undefined) {
        var styleBlock = doc.createElement('style'),
          cssrule = '@media '+q+' { #ejs-qtest { position: absolute; } }';
        //must set type for IE! 
        styleBlock.type = "text/css"; 
        if (styleBlock.styleSheet){ 
          styleBlock.styleSheet.cssText = cssrule;
        } 
        else {
          styleBlock.appendChild(doc.createTextNode(cssrule));
        } 
        docElem.insertBefore(fakeBody, docElem.firstChild);
        docElem.insertBefore(styleBlock, docElem.firstChild);
        cache[q] = ((window.getComputedStyle ? window.getComputedStyle(testDiv,null) : testDiv.currentStyle)['position'] == 'absolute');
        docElem.removeChild(fakeBody);
        docElem.removeChild(styleBlock);
      }
      return cache[q];
    };
    
  })(document);

}