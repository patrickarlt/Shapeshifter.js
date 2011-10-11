/*
* Shapeshifter.js - make binding function to media queries easy
* primary author: Patrick Arlt
* Copyright (c) 2011 Patrick Arlt
* MIT license
*/

Shapeshifter = function(query, callbackActive, callbackInactive){
  
  var object = function(){
    var self = this;
    
    this.query = query;

    this.active = false;
    
    this.callback = {
      active : (typeof callbackActive == "function") ? callbackActive : null;
      inactive : (typeof callbackInactive == "function") ? callbackInactive : null;
    }

    this.remove = function(){
      window.removeEventListener('resize', this.exec);
      window.removeEventListener('onorientationchange', this.exec);      
    };

    this.exec = function(){
      //is the query active?
      if(window.matchMedia(self.query)){
        //State Change
        (!self.active) ? self.callback.active() : false;
        self.active = true;
      } else {
        //State Change
        (self.active) ? self.callback.inactive() : false;
        self.inactive = false;
      }
    };

    window.addEventListener('resize', this.exec);
    window.addEventListener('orientationchange', this.exec);
    this.exec();
  
  };

  object.prototype = {};

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